"use client";
import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { fetchSegments } from "@/app/services/adminServices";
import CustomButton from "@/app/ui/reusableComponents/CustomButton";
import AddSegment from "./AddSegment";

const Segments = () => {
  const [segment, setSegment] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const getSegments = async () => {
    setLoading(true);
    const { segments } = await fetchSegments();
    setSegment(segments);
    setLoading(false);
  };
  useEffect(() => {
    getSegments();
  }, []);

  const segmentColumns = [
    {
      title: "Segment Name",
      dataIndex: "segment_name",
      key: "segment_name",
    },
    {
      title: "Segment Code",
      dataIndex: "segment_code",
      key: "segment_code",
    },
  ];
  return (
    <div>
      <p className="flex justify-center text-[25px]">Registered Segments</p>

      <div className="mt-[10px]">
        <div className="flex justify-end mr-[10px]">
          <CustomButton
            name={"Add Segment"}
            onClick={() => setShowForm(true)}
            className={
              "bg-[#298dc0] text-white p-[5px] rounded-md mb-[10px] hover:bg-[#34c186]"
            }
          />
        </div>
        <Table
          columns={segmentColumns}
          dataSource={segment}
          loading={loading}
        />
        ;
      </div>
      <AddSegment showForm={showForm} handleCancel={() => setShowForm(false)} />
    </div>
  );
};

export default Segments;

"use client";
import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { fetchSegments } from "@/app/services/adminServices";

const Segments = () => {
  const [segment, setSegment] = useState([]);
  const [loading, setLoading] = useState(false);

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
        <Table
          columns={segmentColumns}
          dataSource={segment}
          loading={loading}
        />
        ;
      </div>
    </div>
  );
};

export default Segments;

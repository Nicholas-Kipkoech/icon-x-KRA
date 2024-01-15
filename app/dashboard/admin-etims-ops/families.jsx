"use client";
import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { fetchFamilies, fetchSegments } from "@/app/services/adminServices";
import CustomButton from "@/app/ui/reusableComponents/CustomButton";
import AddFamily from "./AddFamily";
import CustomSelect from "@/app/ui/reusableComponents/CustomSelect";

const Families = () => {
  const [family, setFamily] = useState([]);
  const [selectedSegment, setSelectedSegment] = useState("85000000");
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [segments, setSegments] = useState([]);
  const getFamilies = async (code) => {
    setLoading(true);
    const { families } = await fetchFamilies(code);
    setFamily(families);
    setLoading(false);
  };

  const getSegments = async () => {
    try {
      setLoading(true);
      const { segments: _segments } = await fetchSegments();
      setSegments(_segments);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  const segmentOptions = segments.map((segment) => {
    return {
      label: segment?.segment_name,
      value: segment?.segment_code,
    };
  });

  useEffect(() => {
    getSegments();
  }, []);

  useEffect(() => {
    if (selectedSegment !== "") {
      getFamilies(selectedSegment);
    }
  }, [selectedSegment]);

  const familyColumns = [
    {
      title: "Family Name",
      dataIndex: "family_name",
      key: "family_name",
    },
    {
      title: "Family Code",
      dataIndex: "family_code",
      key: "family_code",
    },
  ];
  return (
    <div>
      <p className="flex justify-center text-[25px]">Registered Families</p>
      <div className="mt-[10px]">
        <div className="flex justify-between items-center mr-[10px]">
          <CustomSelect
            name={"Select Segment"}
            options={segmentOptions}
            className={"h-[40px] w-[300px] mb-[10px]"}
            onChange={(value) => setSelectedSegment(value)}
          />
          <CustomButton
            name={"Add Family"}
            onClick={() => setShowForm(true)}
            className={
              "bg-[#298dc0] text-white p-[5px] h-[40px] rounded-md mb-[10px] hover:bg-[#34c186]"
            }
          />
        </div>
        <Table columns={familyColumns} dataSource={family} loading={loading} />;
      </div>
      <AddFamily
        showForm={showForm}
        handleCancel={() => {
          setShowForm(false);
          getFamilies(selectedSegment);
        }}
      />
    </div>
  );
};

export default Families;

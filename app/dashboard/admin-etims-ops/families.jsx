"use client";
import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { fetchFamilies, fetchSegments } from "@/app/services/adminServices";

const Families = () => {
  const [family, setFamily] = useState([]);
  const [selectedSegment, setSelectedSegment] = useState("85000000");
  const [loading, setLoading] = useState(false);

  const getFamilies = async (code) => {
    setLoading(true);
    const { families } = await fetchFamilies(code);
    setFamily(families);
    setLoading(false);
  };
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
        <Table columns={familyColumns} dataSource={family} loading={loading} />;
      </div>
    </div>
  );
};

export default Families;

"use client";
import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { fetchClasses } from "@/app/services/adminServices";

const Classes = () => {
  const [_class, setClass] = useState([]);
  const [selectedFamily, setSelectedFamily] = useState("85100000");
  const [loading, setLoading] = useState(false);

  const getClasses = async (code) => {
    setLoading(true);
    const { classes } = await fetchClasses(code);
    setClass(classes);
    setLoading(false);
  };
  useEffect(() => {
    if (selectedFamily !== "") {
      getClasses(selectedFamily);
    }
  }, [selectedFamily]);

  const classColumns = [
    {
      title: "Class Name",
      dataIndex: "class_name",
      key: "class_name",
    },
    {
      title: "Class Code",
      dataIndex: "class_code",
      key: "class_code",
    },
  ];
  return (
    <div>
      <p className="flex justify-center text-[25px]">Registered Classes</p>
      <div className="mt-[10px]">
        <Table columns={classColumns} dataSource={_class} loading={loading} />;
      </div>
    </div>
  );
};

export default Classes;

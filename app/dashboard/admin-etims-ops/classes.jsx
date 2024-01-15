"use client";
import React, { useEffect, useState } from "react";
import { Table } from "antd";
import {
  fetchClasses,
  fetchFamilies,
  fetchSegments,
} from "@/app/services/adminServices";
import CustomSelect from "@/app/ui/reusableComponents/CustomSelect";
import CustomButton from "@/app/ui/reusableComponents/CustomButton";
import AddClass from "./AddClass";

const Classes = () => {
  const [_class, setClass] = useState([]);
  const [selectedSegment, setSelectedSegment] = useState("85000000");
  const [selectedFamily, setSelectedFamily] = useState("85100000");
  const [families, setFamilies] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [segments, setSegments] = useState([]);

  const getClasses = async (code) => {
    setLoading(true);
    const { classes } = await fetchClasses(code);
    setClass(classes);
    setLoading(false);
  };

  const getFamilies = async (code) => {
    try {
      setLoading(true);
      const { families: _families } = await fetchFamilies(code);
      setFamilies(_families);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  const familiesOptions = families.map((family) => {
    return {
      label: family?.family_name,
      value: family?.family_code,
    };
  });

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
    if (selectedFamily !== "") {
      getClasses(selectedFamily);
    }
  }, [selectedFamily]);

  useEffect(() => {
    if (selectedSegment) {
      getFamilies(selectedSegment);
    }
  }, [selectedSegment]);

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
        <div className="flex gap-2 items-center">
          <CustomSelect
            name={"Select Segment"}
            placeholder={loading ? "Loading segments" : "Select segment"}
            options={segmentOptions}
            required
            className={"h-[40px] w-[300px] mb-[10px]"}
            onChange={(value) => setSelectedSegment(value)}
          />
          <CustomSelect
            required
            name={"Select Family"}
            placeholder={loading ? "Loading families" : "Select family"}
            options={familiesOptions}
            className={"h-[40px] w-[300px] mb-[10px]"}
            onChange={(value) => setSelectedFamily(value)}
          />
        </div>
        <div className="flex justify-end mb-5">
          <CustomButton
            name={"Add Class"}
            onClick={() => setShowForm(true)}
            className={
              "bg-[#298dc0] text-white p-[5px] h-[40px] rounded-md  hover:bg-[#34c186]"
            }
          />
        </div>
        <Table columns={classColumns} dataSource={_class} loading={loading} />;
      </div>
      <AddClass
        showForm={showForm}
        handleCancel={() => {
          setShowForm(false);
          getClasses(selectedFamily);
        }}
      />
    </div>
  );
};

export default Classes;

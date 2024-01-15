"use client";
import React, { useEffect, useState } from "react";
import { Table } from "antd";
import {
  fetchClasses,
  fetchComodities,
  fetchFamilies,
  fetchSegments,
} from "@/app/services/adminServices";
import CustomButton from "@/app/ui/reusableComponents/CustomButton";
import AddFamily from "./AddFamily";
import CustomSelect from "@/app/ui/reusableComponents/CustomSelect";
import AddComodity from "./AddComodity";

const Comodities = () => {
  const [families, setFamilies] = useState([]);
  const [selectedSegment, setSelectedSegment] = useState("85000000");
  const [selectedFamily, setSelectedFamily] = useState("85100000");
  const [selectedClass, setSelectedClass] = useState("85101500");
  const [comodities, setComodities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [segments, setSegments] = useState([]);
  const [classes, setClasses] = useState([]);

  const getFamilies = async (code) => {
    setLoading(true);
    const { families: _families } = await fetchFamilies(code);
    setFamilies(_families);
    setLoading(false);
  };
  const getClasses = async (code) => {
    setLoading(true);
    const { classes: _classes } = await fetchClasses(code);
    setClasses(_classes);
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

  const familiesOptions = families.map((family) => {
    return {
      label: family?.family_name,
      value: family?.family_code,
    };
  });
  const classesOptions = classes.map((_class) => {
    return {
      label: _class?.class_name,
      value: _class?.class_code,
    };
  });

  const getComodities = async (code) => {
    try {
      setLoading(true);
      const { comodities: _comodities } = await fetchComodities(code);
      setComodities(_comodities);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };
  console.log(comodities);

  useEffect(() => {
    getSegments();
  }, []);

  useEffect(() => {
    if (selectedSegment !== "") {
      getFamilies(selectedSegment);
    }
  }, [selectedSegment]);

  useEffect(() => {
    if (selectedClass !== "") {
      getComodities(selectedClass);
    }
  }, [selectedClass]);

  useEffect(() => {
    if (selectedSegment !== "") {
      getFamilies(selectedSegment);
    }
  }, [selectedSegment]);

  useEffect(() => {
    if (selectedFamily !== "") {
      getClasses(selectedFamily);
    }
  }, [selectedFamily]);

  const comodityColumn = [
    {
      title: "Comodity Name",
      dataIndex: "comodity_name",
      key: "comodity_name",
    },
    {
      title: "Comodity Code",
      dataIndex: "comodity_code",
      key: "comodity_code",
    },
  ];
  return (
    <div>
      <p className="flex justify-center text-[25px]">Registered Families</p>
      <div className="mt-[10px]">
        <div className="flex justify-between items-center mr-[10px]">
          <CustomSelect
            name={"Select Segment"}
            placeholder={loading ? "Loading segments" : "Select segment"}
            required
            options={segmentOptions}
            className={"h-[40px] w-[300px] mb-[10px]"}
            onChange={(value) => setSelectedSegment(value)}
          />
          <CustomSelect
            name={"Select Family"}
            placeholder={loading ? "Loading families" : "Select family"}
            required
            options={familiesOptions}
            className={"h-[40px] w-[300px] mb-[10px]"}
            onChange={(value) => setSelectedFamily(value)}
          />
          <CustomSelect
            name={"Select Class"}
            placeholder={loading ? "Loading classes" : "Select class"}
            required
            options={classesOptions}
            className={"h-[40px] w-[300px] mb-[10px]"}
            onChange={(value) => setSelectedClass(value)}
          />
          <CustomButton
            name={"Add Comodity"}
            onClick={() => setShowForm(true)}
            className={
              "bg-[#298dc0] text-white p-[5px] h-[40px] rounded-md mb-[10px] hover:bg-[#34c186]"
            }
          />
        </div>
        <Table
          columns={comodityColumn}
          dataSource={comodities}
          loading={loading}
        />
        ;
      </div>
      <AddComodity
        showForm={showForm}
        handleCancel={() => {
          setShowForm(false);
          getComodities(selectedClass);
        }}
      />
    </div>
  );
};

export default Comodities;

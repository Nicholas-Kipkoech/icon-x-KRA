"use client";
import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import CustomInput from "@/app/ui/reusableComponents/CustomInput";
import CustomButton from "@/app/ui/reusableComponents/CustomButton";
import { useCustomToast } from "@/app/hooks/useToast";
import {
  AddClassRequest,
  AddComodityRequest,
  fetchClasses,
  fetchFamilies,
  fetchSegments,
} from "@/app/services/adminServices";
import CustomSelect from "@/app/ui/reusableComponents/CustomSelect";

const AddComodity = ({ showForm, handleCancel }) => {
  const showToast = useCustomToast();

  const [comodityName, setComodityName] = useState("");
  const [comodityCode, setComodityCode] = useState("");
  const [families, setFamilies] = useState([]);
  const [selectedFamily, setSelectedFamily] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSegment, setSelectedSegment] = useState("85000000");
  const [segments, setSegments] = useState([]);
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submission, setSubmission] = useState(false);

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
  const getClasses = async (code) => {
    setLoading(true);
    const { classes: _classes } = await fetchClasses(code);
    setClasses(_classes);
    setLoading(false);
  };

  const classesOptions = classes.map((_class) => {
    return {
      label: _class?.class_name,
      value: _class?._id,
    };
  });

  useEffect(() => {
    getSegments();
  }, []);

  useEffect(() => {
    if (selectedSegment) {
      getFamilies(selectedSegment);
    }
  }, [selectedSegment]);

  useEffect(() => {
    if (selectedFamily) {
      getClasses(selectedFamily);
    }
  }, [selectedFamily]);

  const handleAddComodity = async () => {
    try {
      setSubmission(true);
      let formData = new FormData();
      formData.append("classId", selectedClass);
      formData.append("comodity_name", comodityName);
      formData.append("comodity_code", comodityCode);
      await AddComodityRequest(formData);
      setSubmission(false);
      handleCancel();
    } catch (error) {
      setSubmission(false);
      console.log(error?.response.data?.message);
      showToast(error?.response.data?.message, "error");
    }
  };

  return (
    <div>
      <Modal
        open={showForm}
        onCancel={handleCancel}
        title="Add Item Comodity"
        centered
        footer
      >
        <CustomSelect
          required
          name={"Segments"}
          className={"h-[40px]"}
          placeholder={loading ? "Loading segments" : "Select segment"}
          options={segmentOptions}
          onChange={(value) => setSelectedSegment(value)}
        />
        <CustomSelect
          required
          name={"Families"}
          className={"h-[40px]"}
          placeholder={loading ? "Loading families" : "Select family"}
          options={familiesOptions}
          onChange={(value) => setSelectedFamily(value)}
        />
        <CustomSelect
          required
          name={"Classes"}
          className={"h-[40px]"}
          placeholder={loading ? "Loading classes" : "Select class"}
          options={classesOptions}
          onChange={(value) => setSelectedClass(value)}
        />
        <CustomInput
          required
          name={"Comodity Name"}
          onchange={(e) => setComodityName(e.target.value)}
          disabled={loading}
          className={"border h-[40px] p-2 rounded-md"}
        />
        <CustomInput
          required
          name={"Comodity Code"}
          disabled={loading}
          onchange={(e) => setComodityCode(e.target.value)}
          className={"border h-[40px] p-2 rounded-md"}
        />

        <div className="flex justify-end mt-[10px] gap-9">
          <CustomButton
            name={"Cancel"}
            onClick={handleCancel}
            className={"bg-[#e37474] p-2 rounded-md w-[150px] text-white"}
          />
          <CustomButton
            name={submission ? "Saving Comodity" : "Save"}
            onClick={handleAddComodity}
            className={"bg-[#32328f] p-2 rounded-md w-[150px] text-white"}
          />
        </div>
      </Modal>
    </div>
  );
};

export default AddComodity;

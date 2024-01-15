"use client";
import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import CustomInput from "@/app/ui/reusableComponents/CustomInput";
import CustomButton from "@/app/ui/reusableComponents/CustomButton";
import { useCustomToast } from "@/app/hooks/useToast";
import {
  AddClassRequest,
  fetchFamilies,
  fetchSegments,
} from "@/app/services/adminServices";
import CustomSelect from "@/app/ui/reusableComponents/CustomSelect";

const AddClass = ({ showForm, handleCancel }) => {
  const showToast = useCustomToast();

  const [className, setClassName] = useState("");
  const [classCode, setClassCode] = useState("");
  const [families, setFamilies] = useState([]);
  const [familyId, setFamilyId] = useState("");
  const [selectedSegment, setSelectedSegment] = useState("85000000");
  const [segments, setSegments] = useState([]);
  const [loading, setLoading] = useState(false);

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
      value: family?._id,
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
    if (selectedSegment) {
      getFamilies(selectedSegment);
    }
  }, [selectedSegment]);

  const handleAddClass = async () => {
    try {
      setLoading(true);
      let formData = new FormData();
      formData.append("familyId", familyId);
      formData.append("class_name", className);
      formData.append("class_code", classCode);
      await AddClassRequest(formData);
      setLoading(false);
      handleCancel();
    } catch (error) {
      setLoading(false);
      console.log(error?.response.data?.message);
      showToast(error?.response.data?.message, "error");
    }
  };

  return (
    <div>
      <Modal
        open={showForm}
        onCancel={handleCancel}
        title="Add Item Class"
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
          onChange={(value) => setFamilyId(value)}
        />
        <CustomInput
          required
          name={"Class Name"}
          onchange={(e) => setClassName(e.target.value)}
          disabled={loading}
          className={"border h-[40px] p-2 rounded-md"}
        />
        <CustomInput
          required
          name={"Class Code"}
          disabled={loading}
          onchange={(e) => setClassCode(e.target.value)}
          className={"border h-[40px] p-2 rounded-md"}
        />

        <div className="flex justify-end mt-[10px] gap-9">
          <CustomButton
            name={"Cancel"}
            onClick={handleCancel}
            className={"bg-[#e37474] p-2 rounded-md w-[150px] text-white"}
          />
          <CustomButton
            name={loading ? "Saving Class" : "Save"}
            onClick={handleAddClass}
            className={"bg-[#32328f] p-2 rounded-md w-[150px] text-white"}
          />
        </div>
      </Modal>
    </div>
  );
};

export default AddClass;

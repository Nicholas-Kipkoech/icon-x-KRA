"use client";
import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import CustomInput from "@/app/ui/reusableComponents/CustomInput";
import CustomButton from "@/app/ui/reusableComponents/CustomButton";
import { useCustomToast } from "@/app/hooks/useToast";
import { AddFamilyRequest, fetchSegments } from "@/app/services/adminServices";
import CustomSelect from "@/app/ui/reusableComponents/CustomSelect";

const AddFamily = ({ showForm, handleCancel }) => {
  const showToast = useCustomToast();

  const [familyName, setFamilyName] = useState("");
  const [segments, setSegments] = useState([]);
  const [familyCode, setFamilyCode] = useState("");
  const [segmentId, setSegmentId] = useState("");
  const [loading, setLoading] = useState(false);

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
      value: segment?._id,
    };
  });

  useEffect(() => {
    getSegments();
  }, []);

  const handleAddFamily = async () => {
    try {
      setLoading(true);
      let formData = new FormData();
      formData.append("segmentId", segmentId);
      formData.append("family_name", familyName);
      formData.append("family_code", familyCode);
      await AddFamilyRequest(formData);
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
        title="Add Family By Segment"
        centered
        footer
      >
        <CustomSelect
          required
          name={"Segment"}
          className={"h-[40px]"}
          placeholder={loading ? "Loading segments" : "Select segment"}
          options={segmentOptions}
          onChange={(value) => setSegmentId(value)}
        />
        <CustomInput
          required
          name={"Family Name"}
          onchange={(e) => setFamilyName(e.target.value)}
          disabled={loading}
          className={"border h-[40px] p-2 rounded-md"}
        />
        <CustomInput
          required
          name={"Family Code"}
          disabled={loading}
          onchange={(e) => setFamilyCode(e.target.value)}
          className={"border h-[40px] p-2 rounded-md"}
        />

        <div className="flex justify-end mt-[10px] gap-9">
          <CustomButton
            name={"Cancel"}
            onClick={handleCancel}
            className={"bg-[#e37474] p-2 rounded-md w-[150px] text-white"}
          />
          <CustomButton
            name={loading ? "Saving Family" : "Save"}
            onClick={handleAddFamily}
            className={"bg-[#32328f] p-2 rounded-md w-[150px] text-white"}
          />
        </div>
      </Modal>
    </div>
  );
};

export default AddFamily;

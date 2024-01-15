"use client";
import React, { useState } from "react";
import { Modal } from "antd";
import CustomInput from "@/app/ui/reusableComponents/CustomInput";
import CustomButton from "@/app/ui/reusableComponents/CustomButton";
import { useCustomToast } from "@/app/hooks/useToast";
import { AddSegmentRequest } from "@/app/services/adminServices";
const AddSegment = ({ showForm, handleCancel }) => {
  const showToast = useCustomToast();

  const [segmentName, setSegmentName] = useState("");
  const [segmentCode, setSegmentCode] = useState("");
  const [loading, setLoading] = useState(false);
  const handleAddSegment = async () => {
    try {
      setLoading(true);
      let formData = new FormData();
      formData.append("segment_name", segmentName);
      formData.append("segment_code", segmentCode);
      await AddSegmentRequest(formData);
      showToast("Segment added successfully");
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
        title="Add Segment"
        centered
        footer
      >
        <CustomInput
          required
          name={"Segment Name"}
          onchange={(e) => setSegmentName(e.target.value)}
          disabled={loading}
          className={"border h-[40px] p-2 rounded-md"}
        />
        <CustomInput
          required
          name={"Segment Code"}
          disabled={loading}
          onchange={(e) => setSegmentCode(e.target.value)}
          className={"border h-[40px] p-2 rounded-md"}
        />

        <div className="flex justify-end mt-[10px] gap-9">
          <CustomButton
            name={"Cancel"}
            onClick={handleCancel}
            className={"bg-[#e37474] p-2 rounded-md w-[150px] text-white"}
          />
          <CustomButton
            name={loading ? "Saving Segment" : "Save"}
            onClick={handleAddSegment}
            className={"bg-[#32328f] p-2 rounded-md w-[150px] text-white"}
          />
        </div>
      </Modal>
    </div>
  );
};

export default AddSegment;

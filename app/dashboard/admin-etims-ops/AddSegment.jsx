import React from "react";
import { Modal } from "antd";
import CustomInput from "@/app/ui/reusableComponents/CustomInput";
import CustomButton from "@/app/ui/reusableComponents/CustomButton";
const AddSegment = ({ showForm, handleCancel }) => {
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
          className={"border h-[40px] p-2 rounded-md"}
        />
        <CustomInput
          required
          name={"Segment Code"}
          className={"border h-[40px] p-2 rounded-md"}
        />

        <div className="flex justify-end mt-[10px] gap-9">
          <CustomButton
            name={"Cancel"}
            onClick={handleCancel}
            className={"bg-[#e37474] p-2 rounded-md w-[100px] text-white"}
          />
          <CustomButton
            name={"Save"}
            className={"bg-[#32328f] p-2 rounded-md w-[100px] text-white"}
          />
        </div>
      </Modal>
    </div>
  );
};

export default AddSegment;

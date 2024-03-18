"use client";
import React from "react";
import { Modal } from "antd";
import CustomInput from "@/app/ui/reusableComponents/CustomInput";
import CustomSelect from "@/app/ui/reusableComponents/CustomSelect";

const AddSaleModal = ({ open, handleClose }) => {
  return (
    <Modal
      open={open}
      onCancel={handleClose}
      centered
      footer
      title="Add Sale"
      width={1000}
    >
      <div className="flex gap-1 justify-between">
        <div className="w-1/2">
          <CustomSelect
            name={"Customer PIN/Name"}
            placeholder={"Enter or select customer"}
            className={"h-[40px] p-2  rounded-md"}
          />
          <span className="flex justify-end mt-2 ">+ Add Customer</span>
          <CustomInput
            name={"Invoice Number"}
            required
            className={"h-[40px] p-2 border rounded-md"}
          />
        </div>
        <div className="w-1/2">Items Page</div>
      </div>
    </Modal>
  );
};

export default AddSaleModal;

"use client";
import React from "react";
import { Modal } from "antd";
import CustomInput from "@/app/ui/reusableComponents/CustomInput";
import CustomSelect from "@/app/ui/reusableComponents/CustomSelect";
import { recieptTypeOptions } from "@/app/dashboard/transactions/options";

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
            disabled
            className={"h-[40px] p-2 border rounded-md"}
            name={"Customer Name"}
          />
          <CustomInput
            disabled
            className={"h-[40px] p-2 border rounded-md"}
            name={"Phone Number"}
          />
          <CustomInput
            disabled
            className={"h-[40px] p-2 border rounded-md"}
            name={"Email Address"}
          />

          <CustomInput
            name={"Invoice Number"}
            required
            className={"h-[40px] p-2 border rounded-md"}
          />
          <CustomSelect
            name={"Receipt Type"}
            options={recieptTypeOptions}
            required
            placeholder={"Select receipt type"}
          />

          <div className="mt-2">
            <p className="text-[15px] font-[700]">Invoice Items</p>

            <CustomSelect
              name={"Item"}
              required
              placeholder={"Enter or select item"}
            />
            <div className="flex gap-3">
              <CustomInput
                name={"Unit Price (KES)"}
                required
                type={"number"}
                className={"h-[40px] w-[230px] p-2 border rounded-md"}
              />
              <CustomInput
                name={"Quantity"}
                required
                type={"number"}
                className={"h-[40px] p-2 w-[230px] border rounded-md"}
              />
            </div>
          </div>
        </div>
        <div className="w-1/2 rounded-md   justify-center flex ">
          <div className="flex flex-col items-center h-[100px] w-[100%] mt-10 justify-center text-white bg-[grey] rounded-md border">
            <span className="text-[18px] font-[700]">Items</span>
            <span>No items to display here</span>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AddSaleModal;

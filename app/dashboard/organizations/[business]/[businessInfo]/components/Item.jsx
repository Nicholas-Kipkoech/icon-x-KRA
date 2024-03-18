"use client";
import React, { useState } from "react";
import { Table, Modal } from "antd";
import CustomButton from "@/app/ui/reusableComponents/CustomButton";
import CustomInput from "@/app/ui/reusableComponents/CustomInput";
import CustomSelect from "@/app/ui/reusableComponents/CustomSelect";

const Item = () => {
  const [openModal, setOpenModal] = useState(false);
  const itemColumns = [
    {
      title: "Item Code",
      dataIndex: "invoiceNumber",
      key: "invoiceNumber",
    },
    {
      title: "Item Name",
      dataIndex: "invoiceNumber",
      key: "invoiceNumber",
    },
    {
      title: "Tax Type",
      dataIndex: "invoiceNumber",
      key: "invoiceNumber",
    },
    {
      title: "Created At",
      dataIndex: "invoiceNumber",
      key: "invoiceNumber",
    },
    {
      title: "Status",
      dataIndex: "invoiceNumber",
      key: "invoiceNumber",
    },
    {
      title: "Actions",
      dataIndex: "invoiceNumber",
      key: "invoiceNumber",
    },
  ];

  return (
    <div className="mt-10">
      <CustomButton
        name={"Add Item"}
        className={"h-[40px] bg-[#995224] text-white w-[220px] rounded-md m-2 "}
        onClick={() => setOpenModal(true)}
      />
      <Table columns={itemColumns} />

      <Modal
        open={openModal}
        onCancel={() => setOpenModal(false)}
        centered
        title={"Add Item"}
        width={800}
        footer
      >
        <div>
          <CustomInput
            name={"Item Name"}
            required
            className={"h-[40px]  p-2 border rounded-md "}
          />
          <div className="flex flex-wrap gap-2 items-center">
            <CustomSelect
              required
              name={"Item Type"}
              placeholder={"enter item type code"}
              className={" w-[370px]  rounded-sm "}
            />
            <CustomSelect
              required
              name={"Item classification code"}
              placeholder={"Select item classfication code"}
              className={" w-[370px]  rounded-sm "}
            />
            <CustomSelect
              required
              name={"Packaging Unit (PU)"}
              placeholder={"Select packaging unit"}
              className={"  w-[370px]  rounded-sm "}
            />
            <CustomSelect
              required
              name={"Quantity Unit (QU)"}
              placeholder={"Select quantity unit"}
              className={" w-[370px]  rounded-sm "}
            />
            <CustomInput
              name={"Unique product code/Barcode"}
              className={"p-2 w-[370px] border  rounded-sm "}
            />
            <CustomSelect
              required
              name={"Tax Code"}
              placeholder={"Select tax code"}
              className={" w-[370px] rounded-sm "}
            />
            <CustomSelect
              required
              name={"Country"}
              placeholder={"Select country"}
              className={"  w-[370px]  rounded-sm "}
            />
            <CustomInput
              required
              name={"Unit Price (KES)"}
              className={"p-2  w-[370px] border rounded-sm "}
            />
          </div>
        </div>
        <div className="mt-2 flex justify-between">
          <CustomButton
            name={"Cancel"}
            className={"h-[40px] bg-[#995224] text-white rounded-md w-[200px]"}
          />{" "}
          <CustomButton
            name={"Cancel"}
            className={"h-[40px] bg-[#094b6a] text-white rounded-md w-[200px]"}
          />
        </div>
      </Modal>
    </div>
  );
};

export default Item;

"use client";

import React, { useState } from "react";
import { Table } from "antd";
import CustomButton from "@/app/ui/reusableComponents/CustomButton";
const Transactions = () => {
  const [toggle, setToggle] = useState("requests");

  const Requests = [
    {
      title: "User",
      dataIndex: "company_code",
      key: "company_code",
    },
    {
      title: "Company",
      dataIndex: "company_code",
      key: "company_code",
    },
    {
      title: "Trader No",
      dataIndex: "company_code",
      key: "company_code",
    },
    {
      title: "Invoice No",
      dataIndex: "company_code",
      key: "company_code",
    },
    {
      title: "Original Invoice No",
      dataIndex: "company_code",
      key: "company_code",
    },
    {
      title: "Reciept Type Code",
      dataIndex: "company_code",
      key: "company_code",
    },
  ];
  const Responses = [
    {
      title: "Transaction ID",
      dataIndex: "company_code",
      key: "company_code",
    },
    {
      title: "Current Receipt No",
      dataIndex: "company_code",
      key: "company_code",
    },
    {
      title: "Total Receipt No",
      dataIndex: "company_code",
      key: "company_code",
    },
    {
      title: "Internal Data",
      dataIndex: "company_code",
      key: "company_code",
    },
    {
      title: "Recipt Signature",
      dataIndex: "company_code",
      key: "company_code",
    },
    {
      title: "Control Unit DateTime",
      dataIndex: "company_code",
      key: "company_code",
    },
  ];
  const renderTable = () => {
    switch (toggle) {
      case "requests":
        return <Table columns={Requests} />;
      case "responses":
        return <Table columns={Responses} />;
    }
  };

  return (
    <div className="mt-5 ">
      <div className="flex justify-center">
        <CustomButton
          name={"Transactions Requests"}
          type={"button"}
          onClick={() => setToggle("requests")} // Set the toggle state to "requests" when the button is clicked
          className={`h-[40px] ${
            toggle === "requests" ? "bg-[#91bdb3]" : "bg-[#d6a727]"
          } p-2 justify-center items-center flex text-black font-bold border rounded-md w-[100%] `}
        />
        <CustomButton
          name={"Transactions Responses"}
          type={"button"}
          onClick={() => setToggle("responses")}
          className={`h-[40px] ${
            toggle === "responses" ? "bg-[#91bdb3]" : "bg-[#d6a727]"
          } p-2 justify-center items-center flex text-black font-bold border rounded-md w-[100%] `}
        />
      </div>
      <div className="mt-3">{renderTable()}</div>
    </div>
  );
};

export default Transactions;

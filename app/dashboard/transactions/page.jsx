"use client";

import React, { useEffect, useState } from "react";
import { Table } from "antd";
import CustomButton from "@/app/ui/reusableComponents/CustomButton";
import { fetchTransactions } from "@/app/services/adminServices";
import Company from "../users/Company";
import AddTransactions from "./AddTransactions";
const Transactions = () => {
  const [toggle, setToggle] = useState("requests");
  const [requests, setRequests] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const getTransactions = async () => {
    setLoading(true);
    const { transactions } = await fetchTransactions();
    setRequests(transactions);
    setLoading(false);
  };
  useEffect(() => {
    getTransactions();
  }, []);

  const Requests = [
    // {
    //   title: "User",
    //   dataIndex: "company_code",
    //   key: "company_code",
    //   render: (_, item) => <div>{item.user}</div>,
    // },
    {
      title: "Company",
      dataIndex: "company_code",
      key: "company_code",
      render: (_, item) => (
        <div key={_}>
          <Company companyId={item?.company} />
        </div>
      ),
    },
    {
      title: "Trader No",
      dataIndex: "trdInvcNo",
      key: "trdInvcNo",
    },
    {
      title: "Invoice No",
      dataIndex: "invcNo",
      key: "invcNo",
    },
    {
      title: "Original Invoice No",
      dataIndex: "orgInvcNo",
      key: "orgInvcNo",
    },
    {
      title: "Reciept Type Code",
      dataIndex: "rcptTyCd",
      key: "rcptTyCd",
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
        return (
          <Table columns={Requests} dataSource={requests} loading={loading} />
        );
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
      {toggle === "requests" ? (
        <div className="flex justify-end">
          <CustomButton
            name={"Add Transaction"}
            type={"button"}
            onClick={() => setShowForm(true)}
            className={
              "h-[40px] bg-[#8383f5] p-5 flex items-center text-black rounded-md mt-3"
            }
          />
        </div>
      ) : (
        <></>
      )}
      <div className="mt-3">{renderTable()}</div>
      <AddTransactions
        isOpen={showForm}
        onSaved={() => getTransactions()}
        handleClose={() => setShowForm(false)}
      />
    </div>
  );
};

export default Transactions;

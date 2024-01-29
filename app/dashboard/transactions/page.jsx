"use client";

import React, { useEffect, useState } from "react";
import { Table } from "antd";
import CustomButton from "@/app/ui/reusableComponents/CustomButton";
import {
  fetchTransactions,
  fetchTransactionsById,
} from "@/app/services/adminServices";
import Link from "next/link";
import { MdGridView } from "react-icons/md";
import { FaReceipt } from "react-icons/fa6";
import QrCodeComponent from "./QrCode";
import { jwtDecode } from "jwt-decode";

const formatdate = (currentDate) => {
  const formattedDate = currentDate.replace(
    /^(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})$/,
    "$1/$2/$3 $4:$5:$6"
  );
  return formattedDate;
};

const Transactions = () => {
  const [toggle, setToggle] = useState("requests");
  const [requests, setRequests] = useState([]);
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [receiptUrl, setReceiptUrl] = useState("");
  const [user, setUser] = useState("");
  const [loggedInUser, setLoggedInUser] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const decoded_user = jwtDecode(token);
    setLoggedInUser(decoded_user);
  }, []);

  useEffect(() => {
    const getTransactions = async () => {
      setLoading(true);
      if (loggedInUser.role === "Superadmin") {
        const { transactions, response } = await fetchTransactions();
        setResponses(response);
        setRequests(transactions);
        setLoading(false);
      } else {
        if (loggedInUser.organization_id) {
          const { transaction, transactionResponse } =
            await fetchTransactionsById(loggedInUser.organization_id);
          setRequests(transaction);
          setResponses(transactionResponse);
          setLoading(false);
        }
      }
    };
    getTransactions();
  }, [loggedInUser]);

  const Requests = [
    {
      title: "Transaction ID",
      dataIndex: "transactionID",
      key: "transactionID",
      render: (_, item) => (
        <Link href={`transactions/${item?._id}`}>{item.transactionID}</Link>
      ),
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
      title: "Client Name",
      dataIndex: "custNm",
      key: "custNm",
      render: (_, item) => <p>{item?.custNm ? item.custNm : "Null"}</p>,
    },
    {
      title: "Invoice Amount (KES)",
      dataIndex: "intrlData",
      key: "intrlData",
      render: (_, item) => <p>{item.totAmt}</p>,
    },
    {
      title: " Invoice Tax Amount (KES)",
      dataIndex: "intrlData",
      key: "intrlData",
      render: (_, item) => <p>{item.totTaxAmt}</p>,
    },
    {
      title: "Invoice Type",
      dataIndex: "rcptTyCd",
      key: "rcptTyCd",
      render: (_, item) => (
        <p>{item.rcptTyCd === "R" ? "Credit Note" : "Debit Note"}</p>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_, item) => <p className="text-[green]">Success</p>,
    },
  ];
  const url =
    "https://etims-sbx.kra.go.ke/common/link/etims/receipt/indexEtimsReceiptData?Data=P051178573M00";
  const Responses = [
    {
      title: "Invoice Number",
      dataIndex: "invoiceNumber",
      key: "invoiceNumber",
    },

    {
      title: "Client Name",
      dataIndex: "intrlData",
      key: "intrlData",
      render: (_, item) => <p>{item?.clientName ? item.clientName : "Null"}</p>,
    },
    {
      title: "Invoice Amount (KES)",
      dataIndex: "invoiceAmt",
      key: "invoiceAmt",
      render: (_, item) => <p>{item.invoiceAmt}</p>,
    },
    {
      title: " Invoice Tax Amount (KES)",
      dataIndex: "taxAmt",
      key: "taxAmt",
      render: (_, item) => <p>{item.taxAmt}</p>,
    },
    {
      title: "Receipt Signature",
      dataIndex: "rcptSign",
      key: "rcptSign",
    },
    {
      title: "Date Received",
      dataIndex: "sdcDateTime",
      key: "company_code",
      render: (_, item) => <p>{formatdate(item.sdcDateTime)}</p>,
    },
    {
      title: "View Receipt",
      dataIndex: "resultMsg",
      key: "resultMsg",
      render: (_, item) => (
        <div
          onClick={() => {
            setShowForm(true);
            setReceiptUrl(item.rcptSign);
            setUser(item.clientName ? item.clientName : "null");
          }}
          className="cursor-pointer"
        >
          <FaReceipt size={20} />
        </div>
      ),
    },
  ];
  const renderTable = () => {
    switch (toggle) {
      case "requests":
        return (
          <Table columns={Requests} dataSource={requests} loading={loading} />
        );
      case "responses":
        return (
          <Table columns={Responses} dataSource={responses} loading={loading} />
        );
    }
  };

  return (
    <div className="mt-5 ">
      <div className="flex justify-center">
        <CustomButton
          name={"ETIMS submitted invoices"}
          type={"button"}
          onClick={() => setToggle("requests")} // Set the toggle state to "requests" when the button is clicked
          className={`h-[40px] ${
            toggle === "requests" ? "bg-[#cb7529]" : "bg-[#094b6a]"
          } p-2 justify-center items-center flex text-white font-bold border rounded-md w-[100%] `}
        />
        <CustomButton
          name={"ETIMS compliant receipts"}
          type={"button"}
          onClick={() => setToggle("responses")}
          className={`h-[40px] ${
            toggle === "responses" ? "bg-[#cb7529]" : "bg-[#094b6a]"
          } p-2 justify-center items-center flex text-white font-bold border rounded-md w-[100%] `}
        />
      </div>
      <div className="mt-3">{renderTable()}</div>
      <QrCodeComponent
        open={showForm}
        handleClose={() => setShowForm(false)}
        url={`${url}${receiptUrl}`}
        user={user}
      />
    </div>
  );
};

export default Transactions;

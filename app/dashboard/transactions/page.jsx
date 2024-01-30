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
import CustomInput from "@/app/ui/reusableComponents/CustomInput";
import CustomSelect from "@/app/ui/reusableComponents/CustomSelect";
import { formatDate } from "@/app/ui/reusableFunctions/Utils";

const formatCustomdate = (currentDate) => {
  const formattedDate = currentDate.replace(
    /^(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})$/,
    "$1/$2/$3 $4:$5:$6"
  );
  return formattedDate;
};

const Transactions = () => {
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [receiptUrl, setReceiptUrl] = useState("");
  const [user, setUser] = useState("");
  const [loggedInUser, setLoggedInUser] = useState({});
  const [pin, setPin] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const decoded_user = jwtDecode(token);
    setLoggedInUser(decoded_user);
  }, []);

  useEffect(() => {
    const getTransactions = async () => {
      setLoading(true);
      const { response } = await fetchTransactions();
      setResponses(response);
      setLoading(false);
    };
    getTransactions();
  }, []);

  const url =
    "https://etims-sbx.kra.go.ke/common/link/etims/receipt/indexEtimsReceiptData?Data=P600000175A00";
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
      render: (_, item) => (
        <p className="text-[15px]">
          {item?.clientName ? item.clientName : "Null"}
        </p>
      ),
    },
    {
      title: "Invoice Amount (KES)",
      dataIndex: "invoiceAmt",
      key: "invoiceAmt",
      render: (_, item) => (
        <p className="flex justify-end">{item.invoiceAmt.toLocaleString()}</p>
      ),
    },
    {
      title: " Invoice Tax Amount (KES)",
      dataIndex: "taxAmt",
      key: "taxAmt",
      render: (_, item) => (
        <p className="flex justify-end">{item.taxAmt.toLocaleString()}</p>
      ),
    },
    {
      title: "Date Sent",
      dataIndex: "dateSent",
      key: "dateSent",
      render: (_, item) => <p>{formatDate(item.dateSent)}</p>,
    },

    {
      title: "Date Received",
      dataIndex: "sdcDateTime",
      key: "company_code",
      render: (_, item) => <p>{formatCustomdate(item.sdcDateTime)}</p>,
    },
    {
      title: "Receipt Signature",
      dataIndex: "rcptSign",
      key: "rcptSign",
    },
    {
      title: "Status",
      dataIndex: "rcptSign",
      key: "rcptSign",
      render: (_, item) => (
        <span className="text-green-500">{item.status}</span>
      ),
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
  return (
    <div className="mt-5 ">
      <div className="flex justify-center"></div>
      <div className="flex justify-start items-center gap-4">
        <CustomInput
          name={"Invoice Number"}
          required
          className={"h-[35px] border rounded-md p-[5px] "}
        />
        <CustomSelect
          name={"Status"}
          placeholder={"Select by status"}
          options={[
            {
              label: "Success",
              value: "success",
            },
            {
              label: "Failed",
              value: "failed",
            },
          ]}
          required
          className={
            "h-[45px] w-[250px] mt-2 flex items-center  rounded-md p-[5px] "
          }
        />
        <CustomInput
          required
          name={"Invoice Amount"}
          className={"h-[35px] border rounded-md p-[5px] "}
        />
      </div>
      <div className="mt-3">
        <Table
          columns={Responses}
          dataSource={responses}
          loading={loading}
          scroll={{ x: 1500 }}
        />
      </div>
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

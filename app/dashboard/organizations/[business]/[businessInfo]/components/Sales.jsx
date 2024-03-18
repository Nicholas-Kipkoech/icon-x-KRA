"use client";

import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { FaReceipt } from "react-icons/fa6";
import CustomInput from "@/app/ui/reusableComponents/CustomInput";
import CustomSelect from "@/app/ui/reusableComponents/CustomSelect";
import QrCodeComponent from "@/app/dashboard/transactions/QrCode";

import { fetchTransactions } from "@/app/services/adminServices";
import { formatDate } from "@/app/ui/reusableFunctions/Utils";
import CustomButton from "@/app/ui/reusableComponents/CustomButton";
import AddSaleModal from "../modals/AddSaleModal";

const formatCustomdate = (currentDate) => {
  const formattedDate = currentDate.replace(
    /^(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})$/,
    "$1/$2/$3 $4:$5:$6"
  );
  return formattedDate;
};

const Sales = () => {
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [receiptUrl, setReceiptUrl] = useState("");
  const [user, setUser] = useState("");
  const [openModal, setOpenModal] = useState(false);

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
    <div className="mt-10">
      <CustomButton
        name={"Add Sale"}
        onClick={() => setOpenModal(true)}
        className={"h-[40px] bg-[#995224] text-white w-[220px] rounded-md m-2 "}
      />
      <Table
        columns={Responses}
        dataSource={responses}
        loading={loading}
        scroll={{ x: 1500 }}
      />

      <QrCodeComponent
        open={showForm}
        handleClose={() => setShowForm(false)}
        url={`${url}${receiptUrl}`}
        user={user}
      />

      <AddSaleModal open={openModal} handleClose={() => setOpenModal(false)} />
    </div>
  );
};

export default Sales;

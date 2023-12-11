"use client";
import { fetchItemInfo } from "@/app/services/adminServices";
import React, { useEffect, useState } from "react";
import { Table } from "antd";

const ItemInfo = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const getItemInfo = async () => {
    setLoading(true);
    const { response } = await fetchItemInfo();
    setData(response.data.itemClsList);
    setLoading(false);
  };
  useEffect(() => {
    getItemInfo();
  }, []);
  const columns = [
    {
      title: "Item Class Code",
      dataIndex: "itemClsCd",
      key: "itemClsCd",
    },
    {
      title: "Item Class Name",
      dataIndex: "itemClsNm",
      key: "itemClsNm",
    },
    {
      title: "Item Class Level",
      dataIndex: "itemClsLvl",
      key: "itemClsLvl",
    },
    {
      title: "Taxation Type Code",
      dataIndex: "taxTyCd",
      key: "taxTyCd",
      render: (_, item) => <p>{item.taxTyCd ? item.taxTyCd : "Null"}</p>,
    },
    {
      title: "Major Target?",
      dataIndex: "mjrTgYn",
      key: "mjrTgYn",
      render: (_, item) => <p>{item.mjrTgYn ? item.mjrTgYn : "Null"}</p>,
    },
    {
      title: "Used?",
      dataIndex: "useYn",
      key: "useYn",
    },
  ];
  return (
    <div className="mt-[10px] m-2">
      <p className="flex justify-center text-[20px] font-bold underline">
        Item Information provided by ETIMS server
      </p>
      <Table columns={columns} dataSource={data} loading={loading} />
    </div>
  );
};

export default ItemInfo;

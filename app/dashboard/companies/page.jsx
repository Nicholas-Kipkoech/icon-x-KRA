"use client";
import React, { useEffect, useState } from "react";
import { Table, Spin } from "antd";
import { fetchCompanies } from "@/app/services/adminServices";
import { formatDate } from "../users/page";
const Companies = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    const response = await fetchCompanies();
    setLoading(false);
    setData(response?.companies);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    {
      title: "Company Name",
      dataIndex: "company_name",
      key: "company_name",
      render: (_, item) => (
        <div className="bg-green-950 text-white p-2 text-center rounded-md">
          {(item?.company_name).toUpperCase()}
        </div>
      ),
    },
    {
      title: "Company Code",
      dataIndex: "company_code",
      key: "company_code",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_, item) => (
        <div>
          {item?.status === "Active" ? (
            <p className="bg-[green] p-2 text-center rounded-md text-white">
              Active
            </p>
          ) : (
            <p className="bg-[#e2e2e2] p-2 text-center rounded-md text-[black]">
              Inactive
            </p>
          )}
        </div>
      ),
    },

    {
      title: "Company Email",
      dataIndex: "company_email",
      key: "company_email",
    },
    {
      title: "Created By",
      dataIndex: "created_by",
      key: "created_by",
    },
    {
      title: "Created at",
      dataIndex: "created_at",
      key: "created_at",
      render: (_, item) => <div>{formatDate(item.created_at)}</div>,
    },
  ];
  return (
    <div className="m-6">
      <Spin spinning={loading} delay={500}>
        <Table columns={columns} dataSource={data} loading={loading} />
      </Spin>
    </div>
  );
};

export default Companies;

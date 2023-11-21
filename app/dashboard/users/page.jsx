"use client";
import { fetchCompanyUsers } from "@/app/services/adminServices";
import { ConfigProvider, Table, Spin } from "antd";
import React, { useEffect, useState } from "react";

export const formatDate = (serverDate) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  const locale = "en-US";

  return new Date(serverDate).toLocaleDateString(locale, options);
};

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    setLoading(true);
    const data = await fetchCompanyUsers();
    setUsers(data.users);
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Created at",
      dataIndex: "created_at",
      key: "created_at",
      render: (_, item) => <div>{formatDate(item?.created_at)}</div>,
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (_, item) => (
        <p>{item?.role === "Normal_user" ? "Normal User" : "Admin"}</p>
      ),
    },
  ];

  return (
    <div>
      <Spin spinning={loading} delay={500}>
        <div className="mt-10">
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: "#ff2146",
              },
            }}
          >
            <Table dataSource={users} columns={columns} loading={loading} />
          </ConfigProvider>
        </div>
      </Spin>
    </div>
  );
};

export default Users;

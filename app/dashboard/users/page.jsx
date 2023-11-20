"use client";
import { fetchCompanyUsers } from "@/app/services/adminServices";
import { CustomTable } from "@/app/ui/reusableComponents/CustomTable";
import HeaderBar from "@/app/ui/reusableComponents/HeaderBar";
import { Table } from "antd";
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
      {loading ? (
        <p className="text-[30px]">Loading data......</p>
      ) : (
        <div className="mt-10">
          <Table dataSource={users} columns={columns} loading={loading} />
        </div>
      )}
    </div>
  );
};

export default Users;

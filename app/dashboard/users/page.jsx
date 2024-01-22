"use client";
import { fetchUsers } from "@/app/services/adminServices";
import React, { useEffect, useState } from "react";
import { Table } from "antd";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const getUsers = async () => {
    try {
      setLoading(true);
      const { _users } = await fetchUsers();
      const filteredUsers = _users.filter((user) => user.role !== "Superadmin");
      setUsers(filteredUsers);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };
  useEffect(() => {
    getUsers();
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
      title: "Business Segment",
      dataIndex: "business_segment",
      key: "business_segment",
    },
    {
      title: "Business Family",
      dataIndex: "business_family",
      key: "business_family",
    },
    {
      title: "Business Class",
      dataIndex: "business_class",
      key: "business_class",
    },
  ];

  return (
    <div className="mt-5">
      <Table columns={columns} dataSource={users} loading={loading} />
    </div>
  );
};

export default Users;

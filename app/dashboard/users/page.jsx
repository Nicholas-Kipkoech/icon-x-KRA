"use client";
import { fetchUsers } from "@/app/services/adminServices";
import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { getFamily } from "@/app/ui/reusableFunctions/Utils";
import { Class, Family, Segment } from "./CrudOps";

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
      render: (_, item) => <Segment segment_code={item.business_segment} />,
    },
    {
      title: "Business Family",
      dataIndex: "business_family",
      key: "business_family",
      render: (_, item) => <Family family_code={item.business_family} />,
    },
    {
      title: "Business Class",
      dataIndex: "business_class",
      key: "business_class",
      render: (_, item) => <Class class_code={item.business_class} />,
    },
  ];

  return (
    <div className="mt-5">
      <Table columns={columns} dataSource={users} loading={loading} />
    </div>
  );
};

export default Users;

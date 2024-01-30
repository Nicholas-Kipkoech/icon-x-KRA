"use client";
import { fetchUsers } from "@/app/services/adminServices";
import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { formatDate, getFamily } from "@/app/ui/reusableFunctions/Utils";
import { Class, Family, Segment } from "./CrudOps";
import { jwtDecode } from "jwt-decode";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const decoded_user = jwtDecode(token);
    setLoggedInUser(decoded_user);
  }, []);

  useEffect(() => {
    const getUsers = async () => {
      try {
        setLoading(true);
        if (loggedInUser.role === "Superadmin") {
          const { _users } = await fetchUsers();
          setUsers(_users.filter((user) => user.role !== "Superadmin"));
        } else {
          const { _users } = await fetchUsers();
          setUsers(_users.filter((user) => user.email === loggedInUser.email));
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error(error);
      }
    };
    getUsers();
  }, [loggedInUser]);

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
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
      render: (_, item) => (
        <div>{formatDate(item.created_at ? item.created_at : Date.now())}</div>
      ),
    },
  ];

  return (
    <div className="mt-5">
      <Table columns={columns} dataSource={users} loading={loading} />
    </div>
  );
};

export default Users;

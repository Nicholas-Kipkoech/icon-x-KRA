"use client";
import {
  fetchCompanyById,
  fetchCompanyUsers,
} from "@/app/services/adminServices";
import CustomButton from "@/app/ui/reusableComponents/CustomButton";
import { ConfigProvider, Table, Spin } from "antd";
import React, { useEffect, useState } from "react";
import AddUser from "./AddUser";
import Company from "./Company";

export const formatDate = (serverDate) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  const locale = "en-US";

  return new Date(serverDate).toLocaleDateString(locale, options);
};

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [saved, setSaved] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    const data = await fetchCompanyUsers();
    setLoading(false);
    setUsers(data?.users);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (_, item) => (
        <div className="text-[12px]" key={_}>
          {(item?.name).toUpperCase()}
        </div>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Company",
      dataIndex: "company",
      key: "company",
      render: (_, item) => (
        <div key={_}>
          <Company companyId={item?.company} />
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_, item) => (
        <div key={_}>
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
      title: "Created at",
      dataIndex: "created_at",
      key: "created_at",
      render: (_, item) => <div key={_}>{formatDate(item?.created_at)}</div>,
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (_, item) => (
        <div key={_}>
          {item?.role === "Normal_user" ? (
            <p className="bg-[#6eb7db] text-center p-2 rounded-md">
              Normal User
            </p>
          ) : (
            <p className="bg-[#6e8a1a] text-white text-center rounded-md p-2">
              Admin
            </p>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="mt-6">
      <div className="flex justify-end mb-5">
        <CustomButton
          name={"Add User"}
          className={"bg-[#d3e4ed] p-2 w-[200px] rounded-md text-black"}
          onClick={() => setShowForm(true)}
        />
      </div>
      <Spin spinning={loading} delay={500}>
        <Table
          columns={columns}
          dataSource={users}
          loading={loading || saved}
        />
      </Spin>

      <AddUser
        isOpen={showForm}
        handleClose={() => setShowForm(false)}
        onUserSaved={fetchUsers}
      />
    </div>
  );
};

export default Users;

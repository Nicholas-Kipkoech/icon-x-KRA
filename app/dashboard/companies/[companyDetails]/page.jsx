"use client";
import { fetchCompanyById } from "@/app/services/adminServices";
import React, { useEffect, useState } from "react";
import { Spin, Table } from "antd";
import Image from "next/image";
import CustomButton from "@/app/ui/reusableComponents/CustomButton";
import Company from "../../users/Company";
import { formatDate } from "../../users/page";
const CompanyDetails = ({ params: { companyDetails } }) => {
  const [company, setCompany] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCompany = async () => {
    setLoading(true);
    const data = await fetchCompanyById(companyDetails);
    setCompany(data?.company);
    setUsers(data?.users);
    setLoading(false);
  };

  useEffect(() => {
    fetchCompany();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (_, item) => (
        <div className="text-[12px]" key={_}>
          {item.name ? (item?.name).toUpperCase() : "Not Updated"}
        </div>
      ),
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
      render: (_, item) => (
        <div key={_}>
          {item?.status === "Active" ? (
            <p className=" text-center rounded-md flex ">Active</p>
          ) : (
            <p className=" text-center rounded-md flex ">Inactive</p>
          )}
        </div>
      ),
    },
    {
      title: "Created In",
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
            <p className="text-center p-2 rounded-md flex font-[700]">
              Normal User
            </p>
          ) : (
            <p className="text-center rounded-md p-2 flex font-[700]">Admin</p>
          )}
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex mt-10 p-2 justify-center gap-8 border bg-[#ccc47e] h-[400px] items-center text-black rounded-md">
        {loading ? (
          <Spin
            spinning={loading}
            delay={500}
            size="large"
            className="text-white"
          />
        ) : (
          <>
            <Image
              src={
                company.logo_url
                  ? company.logo_url
                  : "https://img.freepik.com/free-vector/flat-design-no-photo-sign_23-2149272417.jpg?w=826&t=st=1700644352~exp=1700644952~hmac=86dbb621baf487e91f8c3b38b504c07e5b733bea971ccdfa9eedf8d2ce4d94d7"
              }
              width={"100"}
              height={"100"}
              alt={company?.company_name}
              className="h-[300px] w-[300px] rounded-[50%] border bg-white"
            />
            <div className=" p-[20px] h-[auto] w-[auto] justify-end">
              <div className="font-[500] text-[60px]">
                {company?.company_name}
              </div>
              <div className="text-[25px]">
                Company Code: {company?.company_code}
              </div>
              <div className="text-[25px]">Status: {company?.status}</div>
              <div className="text-[25px]">
                Company Email: {company?.company_email}
              </div>
            </div>
          </>
        )}
      </div>
      <div className="mt-10">
        <p className="text-[30px] font-[700] flex justify-center">Users</p>
        {users.length > 0 ? (
          <Spin spinning={loading} delay={500}>
            <Table columns={columns} dataSource={users} loading={loading} />
          </Spin>
        ) : (
          <p>No data loading...</p>
        )}
      </div>
    </div>
  );
};

export default CompanyDetails;

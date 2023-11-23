"use client";
import React, { useEffect, useState } from "react";
import { Table, Spin } from "antd";
import { fetchCompanies } from "@/app/services/adminServices";
import { formatDate } from "../users/page";
import AddCompany from "./AddCompany";
import CustomButton from "@/app/ui/reusableComponents/CustomButton";
import CustomInput from "@/app/ui/reusableComponents/CustomInput";
const Companies = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");

  const fetchData = async () => {
    setLoading(true);
    const response = await fetchCompanies();
    setLoading(false);

    // Filter the companies based on the search term
    const filteredData = response?.companies.filter((company) =>
      company.company_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setData(filteredData);
  };
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  const columns = [
    {
      title: "Company Logo",
      dataIndex: "company_code",
      key: "company_code",
      render: (_, item) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={
            item.logo_url
              ? item.logo_url
              : "https://img.freepik.com/free-vector/flat-design-no-photo-sign_23-2149272417.jpg?w=826&t=st=1700644352~exp=1700644952~hmac=86dbb621baf487e91f8c3b38b504c07e5b733bea971ccdfa9eedf8d2ce4d94d7"
          }
          alt={item.company_name}
          className="h-[40px] rounded-[50px]"
        />
      ),
    },
    {
      title: "Company Name",
      dataIndex: "company_name",
      key: "company_name",
      render: (_, item) => (
        <div className="text-[#e25454] font-[700] p-2 text-center rounded-md">
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
      <div className="flex justify-between mb-5">
        <div>
          <input
            placeholder="search company.."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border h-[50px] p-2 w-[400px] border-cyan-800 rounded-md"
          />
        </div>
        <CustomButton
          name={"Enroll new company"}
          className={
            "bg-[#d3e4ed] p-2 w-[200px] rounded-md h-[50px] text-black"
          }
          onClick={() => setShowForm(true)}
        />
      </div>
      {data.length > 1 ? (
        <Spin spinning={loading} delay={500}>
          <Table columns={columns} dataSource={data} loading={loading} />
        </Spin>
      ) : (
        <Spin
          size="large"
          tip="Loading"
          className="flex justify-center items-center"
        />
      )}

      <AddCompany
        isOpen={showForm}
        handleClose={() => {
          setShowForm(false);
          fetchData();
        }}
        onCompanySaved={fetchData}
      />
    </div>
  );
};

export default Companies;

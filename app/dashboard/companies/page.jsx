"use client";
import React, { useEffect, useState } from "react";
import { Table, Spin } from "antd";
import Link from "next/link";
import { deleteCompany, fetchCompanies } from "@/app/services/adminServices";
import { formatDate } from "../users/page";
import AddCompany from "./AddCompany";
import CustomButton from "@/app/ui/reusableComponents/CustomButton";
import CustomInput from "@/app/ui/reusableComponents/CustomInput";
import { useCustomToast } from "@/app/hooks/useToast";
const Companies = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState({});
  const [mode, setMode] = useState("create");
  const showToast = useCustomToast();

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

  const handleDelete = async (id) => {
    await deleteCompany(id);

    showToast("company deleted successfully");
    fetchData();
  };
  const handleClose = () => {
    setShowForm(false);
    setMode("create"); // Reset the mode to 'create'
    setEditData({});
  };
  const handleEdit = (company) => {
    setEditData(company);
    setMode("edit");
    setShowForm(true);
  };

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
        <Link
          href={`companies/${item?._id}`}
          className="text-[#e25454] font-[700] p-2 text-center rounded-md"
        >
          {(item?.company_name).toUpperCase()}
        </Link>
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
            <p className=" p-2 text-center rounded-md">Active</p>
          ) : (
            <p className=" p-2 text-center rounded-md ">Inactive</p>
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
      title: "Created In",
      dataIndex: "created_at",
      key: "created_at",
      render: (_, item) => <div>{formatDate(item.created_at)}</div>,
    },
    {
      title: "Actions",
      dataIndex: "created_at",
      key: "created_at",
      render: (_, item) => (
        <div key={_} className="flex gap-2">
          <CustomButton
            name={"Edit"}
            className={"text-[#718000] bg-blue-200 p-2 w-[60px] rounded-md"}
            onClick={() => handleEdit(item)}
          />

          <CustomButton
            name={"Delete"}
            className={"text-[red] bg-blue-200 p-2 w-[auto] rounded-md"}
            onClick={() => handleDelete(item?._id)}
          />
        </div>
      ),
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
      {data.length > 0 ? (
        <Spin spinning={loading} delay={500}>
          <Table columns={columns} dataSource={data} loading={loading} />
        </Spin>
      ) : (
        <Spin size="large" className="flex justify-center items-center" />
      )}

      <AddCompany
        isOpen={showForm}
        handleClose={handleClose}
        editData={editData}
        mode={mode}
        onCompanySaved={fetchData}
      />
    </div>
  );
};

export default Companies;

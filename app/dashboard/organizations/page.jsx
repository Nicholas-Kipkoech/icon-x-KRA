"use client";
import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { fetchOrganizations } from "@/app/services/adminServices";
import { formatDate } from "@/app/ui/reusableFunctions/Utils";
import { Class, Family, Segment } from "../users/CrudOps";
const OrganizationPage = () => {
  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(false);

  const getOrganizations = async () => {
    setLoading(true);
    const { registered_organizations } = await fetchOrganizations();
    setOrganizations(registered_organizations);
    setLoading(false);
  };

  useEffect(() => {
    getOrganizations();
  }, []);

  const columns = [
    {
      title: "Organization Name",
      dataIndex: "organization_name",
      key: "organization_name",
    },
    {
      title: "Organization Email",
      dataIndex: "organization_email",
      key: "organization_email",
    },
    {
      title: "Organization Phone",
      dataIndex: "organization_phone",
      key: "organization_phone",
    },
    {
      title: "Business Segment Code",
      dataIndex: "business_segment",
      key: "business_segment",
      render: (_, item) => <Segment segment_code={item.business_segment} />,
    },
    {
      title: "Business Family Code",
      dataIndex: "business_family",
      key: "business_family",
      render: (_, item) => <Family family_code={item.business_family} />,
    },
    {
      title: "Business Class Code",
      dataIndex: "business_class",
      key: "business_class",
      render: (_, item) => <Class class_code={item.business_class} />,
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
      render: (_, item) => <div>{formatDate(item.created_at)}</div>,
    },
  ];

  return (
    <div className="mt-[20px]">
      <Table dataSource={organizations} columns={columns} loading={loading} />
    </div>
  );
};

export default OrganizationPage;

"use client";
import { fetchCompanyById } from "@/app/services/adminServices";
import React, { useEffect, useState } from "react";
import { Spin } from "antd";
const Company = ({ companyId }) => {
  const [company, setCompany] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchCompany = async (id) => {
    setLoading(true);
    const data = await fetchCompanyById(id);
    setCompany(data?.company?.company_name);
    setLoading(false);
  };
  useEffect(() => {
    fetchCompany(companyId);
  }, [companyId]);

  return (
    <div>
      <Spin spinning={loading} delay={500}>
        {company.toLocaleUpperCase()}
      </Spin>
    </div>
  );
};

export default Company;

"use client";

import React, { useEffect, useState } from "react";
import {
  fetchOrganizations,
  fetchTransactions,
} from "../services/adminServices";
import { Spin } from "antd";
import { jwtDecode } from "jwt-decode";
import Link from "next/link";
import { MdOutlineAttachMoney, MdPeople } from "react-icons/md";
import { FaBuildingColumns } from "react-icons/fa6";
import { FaFileInvoice } from "react-icons/fa";

import {
  calculateTotalAmount,
  checkDates,
} from "../ui/reusableFunctions/Utils";

const Dashboard = () => {
  const [user, setUser] = useState({});
  const [orgs, setOrgs] = useState([]);
  const [orgsLoading, setOrgsLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [txLoading, setTxLoading] = useState(false);
  const [userLoading, setUserLoading] = useState(false);
  const [today, setTodayAmt] = useState(0);
  const [month, setMonthAmt] = useState(0);
  const [year, setYearAmt] = useState(0);
  const [todayInvoices, setTodayInvoices] = useState([]);
  const [monthInvoices, setMonthInvoices] = useState([]);
  const [yearInvoices, setYearInvoices] = useState([]);

  const getOrgs = async () => {
    setOrgsLoading(true);
    const { registered_organizations } = await fetchOrganizations();
    setOrgs(registered_organizations);
    setOrgsLoading(false);
  };

  useEffect(() => {
    const getTransactions = async () => {
      setTxLoading(true);
      const { transactions } = await fetchTransactions();
      setTransactions(transactions);
      setTxLoading(false);
    };

    getTransactions();
  }, [user]);

  useEffect(() => {
    if (transactions.length > 0) {
      const { todayTotalAmount, monthTotalAmount, yearTotalAmount } =
        calculateTotalAmount(transactions);
      setTodayAmt(todayTotalAmount);
      setMonthAmt(monthTotalAmount);
      setYearAmt(yearTotalAmount);
    }
  }, [transactions]);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const decoded_user = jwtDecode(token);
    setUser(decoded_user);
  }, []);

  useEffect(() => {
    getOrgs();
  }, []);

  useEffect(() => {
    if (transactions) {
      const { monthTransations, yearTransactions, todayTransactions } =
        checkDates(transactions);
      setTodayInvoices(todayTransactions);
      setYearInvoices(yearTransactions);
      setMonthInvoices(monthTransations);
    }
  }, [transactions]);

  const AdminCard = ({ name, count, to, icon, amounts, dates }) => {
    return (
      <Link
        href={`/dashboard/${to}`}
        className="sm:w-[30rem] lg:w-[14rem] lg:h-[9rem] xl:w-[18rem] 2xl:w-[22rem] 2xl:h-[10rem] border hover:border-[#cb7529]  rounded-[20px] flex flex-col   items-center  justify-center bg-[white]"
      >
        {amounts && (
          <p className="text-[20px] mb-2 sm:text-[16px] 2xl:text-[16px] pt-3">
            {dates}
          </p>
        )}
        <div className="flex justify-center items-center gap-2 sm:gap-3 lg:gap-4 2xl:gap-6">
          <div className="text-[#cb7529] bg-[#092332] rounded-[50px] p-[20px]">
            {icon}
          </div>
          <p className="text-[20px] sm:text-[18px] md:text-[20px] xl:text-[24px] 2xl:text-[20px] flex justify-center text-[#092332]">
            {count}
          </p>
        </div>
        <p className="flex justify-center text-[15px]">{name}</p>
      </Link>
    );
  };

  return (
    <div className="mt-[10px]">
      <p className="text-[25px] mt-4 md:text-[20px] sm:text-[16px]  flex justify-center">
        Transactions Summary
      </p>
      <div className="flex flex-wrap gap-[12px] mt-4 sm:flex sm:justify-center">
        <AdminCard
          dates={"Year To Date"}
          amounts
          to={""}
          name={"Total Amount (KES)"}
          count={year.toLocaleString()}
          icon={<MdOutlineAttachMoney size={30} />}
        />
        <AdminCard
          dates={"Month To Date"}
          amounts
          to={""}
          name={"Total Amount (KES)"}
          count={month.toLocaleString()}
          icon={<MdOutlineAttachMoney size={30} />}
        />
        <AdminCard
          dates={"Today"}
          to={""}
          amounts
          name={"Total Amount (KES)"}
          count={today.toLocaleString()}
          icon={<MdOutlineAttachMoney size={30} />}
        />
      </div>
      <p className="text-[25px] mt-4 md:text-[20px] sm:text-[16px] flex justify-center">
        Invoices Summary
      </p>
      <div className="flex flex-wrap gap-[12px] mt-4 sm:flex sm:justify-center">
        <AdminCard
          dates={"Year To Date"}
          amounts
          count={
            txLoading ? <Spin spinning={txLoading} /> : yearInvoices.length
          }
          name={"Invoices Submitted"}
          to={"transactions"}
          icon={<FaFileInvoice size={30} />}
        />
        <AdminCard
          dates={"Month To Date"}
          amounts
          count={
            txLoading ? <Spin spinning={txLoading} /> : monthInvoices.length
          }
          name={"Invoices Submitted"}
          to={"transactions"}
          icon={<FaFileInvoice size={30} />}
        />
        <AdminCard
          dates={"Today"}
          amounts
          count={
            txLoading ? <Spin spinning={txLoading} /> : todayInvoices.length
          }
          name={"Invoices Submitted"}
          to={"transactions"}
          icon={<FaFileInvoice size={30} />}
        />{" "}
      </div>
      <p className="text-[25px] mt-4 md:text-[20px] sm:text-[16px] flex justify-center">
        Data Overview
      </p>
      <div className="flex flex-wrap gap-[12px] mt-4 sm:flex sm:justify-center">
        {user?.role === "Superadmin" && (
          <>
            <AdminCard
              count={userLoading ? <Spin spinning={userLoading} /> : 0}
              name={"Enrolled Users"}
              to={"users"}
              icon={<MdPeople size={30} />}
            />
            <AdminCard
              count={
                orgsLoading ? <Spin spinning={orgsLoading} /> : orgs.length
              }
              name={"Registered Organizations"}
              to={"organizations"}
              icon={<FaBuildingColumns size={30} />}
            />
          </>
        )}
      </div>
      <p className="text-[25px] mt-5 md:text-[20px] sm:text-[10px] flex justify-center">
        Graphical Analysis
      </p>
    </div>
  );
};

export default Dashboard;

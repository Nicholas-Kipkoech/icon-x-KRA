"use client";

import React, { useEffect, useState } from "react";
import {
  fetchOrganizations,
  fetchTransactions,
  fetchUsers,
} from "../services/adminServices";
import { Spin } from "antd";
import { jwtDecode } from "jwt-decode";
import Link from "next/link";
import {
  MdLocalPostOffice,
  MdOutlineAttachMoney,
  MdOutlineMoney,
  MdPeople,
} from "react-icons/md";
import { FaBuildingColumns } from "react-icons/fa6";
import { FaFileInvoice } from "react-icons/fa";

const Dashboard = () => {
  const [user, setUser] = useState({});
  const [users, setUsers] = useState([]);
  const [orgs, setOrgs] = useState([]);
  const [orgsLoading, setOrgsLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [txLoading, setTxLoading] = useState(false);
  const [userLoading, setUserLoading] = useState(false);
  const getOrgs = async () => {
    setOrgsLoading(true);
    const { registered_organizations } = await fetchOrganizations();
    setOrgs(registered_organizations);
    setOrgsLoading(false);
  };

  const getTransactions = async () => {
    setTxLoading(true);
    const { transactions } = await fetchTransactions();
    setTransactions(transactions);
    setTxLoading(false);
  };
  const getUsers = async () => {
    setUserLoading(true);
    const { _users } = await fetchUsers();
    setUsers(_users);
    setUserLoading(false);
  };

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const decoded_user = jwtDecode(token);
    setUser(decoded_user);
  }, []);

  useEffect(() => {
    getTransactions();
  }, []);
  useEffect(() => {
    getOrgs();
  }, []);

  useEffect(() => {
    getUsers();
  }, []);

  const AdminCard = ({ name, count, to, icon }) => {
    return (
      <Link
        href={`/dashboard/${to}`}
        className="h-[10rem] border w-[22rem] rounded-[30px] flex flex-col   items-center  justify-center bg-[white]"
      >
        <div className="flex justify-center items-center gap-4">
          <div className="text-[#cb7529] bg-[#092332] rounded-[50px] p-[20px]">
            {icon}
          </div>
          <p className="text-[35px] flex justify-center text-[#092332]">
            {count}
          </p>
        </div>
        <p className="flex justify-center text-[15px] mt-2">{name}</p>
      </Link>
    );
  };

  return (
    <div className="mt-[10px]">
      <p className="text-[25px]">Data Overview</p>
      <div className="flex flex-wrap gap-10 mt-4">
        {user?.role === "Superadmin" && (
          <>
            <AdminCard
              count={
                userLoading ? <Spin spinning={userLoading} /> : users.length
              }
              name={"Enrolled Users"}
              to={"users"}
              icon={<MdPeople size={30} />}
            />
            <AdminCard
              count={
                orgsLoading ? (
                  <Spin spinning={orgsLoading} />
                ) : (
                  orgs.length.toLocaleString()
                )
              }
              name={"Registered Organizations"}
              to={"organizations"}
              icon={<FaBuildingColumns size={30} />}
            />
            <AdminCard
              count={(transactions.length * 115).toLocaleString()}
              name={"Total Amount (KES)"}
              to={""}
              icon={<MdOutlineAttachMoney size={30} />}
            />
          </>
        )}
        <AdminCard
          count={
            txLoading ? <Spin spinning={txLoading} /> : transactions.length
          }
          name={"Invoices Submitted"}
          to={"transactions"}
          icon={<FaFileInvoice size={30} />}
        />
      </div>
      <p className="text-[25px] mt-5">Graphical Analysis</p>
    </div>
  );
};

export default Dashboard;

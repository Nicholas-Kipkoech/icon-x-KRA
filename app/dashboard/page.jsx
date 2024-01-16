"use client";

import React, { useEffect, useState } from "react";
import {
  fetchOrganizations,
  fetchTransactions,
  fetchUsers,
} from "../services/adminServices";
import { Spin } from "antd";
import { jwtDecode } from "jwt-decode";
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

  const AdminCard = ({ name, count }) => {
    return (
      <div className="h-[10rem] border w-[300px] rounded-md border-cyan-800 items-center text-white flex flex-col justify-center bg-[#c47129]">
        <p className="text-[75px] text-[#092332]">{count}</p>
        <p className="font-[sans-serif] text-[20px]">{name}</p>
      </div>
    );
  };

  return (
    <div className="mt-[10px] flex flex-wrap gap-10">
      {user?.role === "Superadmin" && (
        <>
          <AdminCard
            count={userLoading ? <Spin spinning={userLoading} /> : users.length}
            name={"Enrolled Users"}
          />
          <AdminCard
            count={orgsLoading ? <Spin spinning={orgsLoading} /> : orgs.length}
            name={"Registered Organizations"}
          />
        </>
      )}
      <AdminCard
        count={txLoading ? <Spin spinning={txLoading} /> : transactions.length}
        name={"Sales Transactions Done"}
      />
    </div>
  );
};

export default Dashboard;

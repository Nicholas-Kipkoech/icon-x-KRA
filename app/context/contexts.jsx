"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { fetchOrganizations } from "../services/adminServices";

const Context = createContext({});

export const ContextProvider = ({ children }) => {
  const [organizations, setOrganizations] = useState([]);

  const getOrganizations = async () => {
    const { registered_organizations } = await fetchOrganizations();
    setOrganizations(registered_organizations);
  };
  useEffect(() => {
    getOrganizations();
  }, []);
  return (
    <Context.Provider value={{ organizations }}>{children}</Context.Provider>
  );
};

export const useContextApi = () => useContext(Context);

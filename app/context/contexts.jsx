"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  fetchBusinessByOrganization,
  fetchOrganizations,
} from "../services/adminServices";

const Context = createContext({});

export const ContextProvider = ({ children }) => {
  const [organizations, setOrganizations] = useState([]);
  const [cachedData, setCachedDate] = useState({});

  const getOrgById = async (id, forceRefresh = false) => {
    if (!forceRefresh && cachedData[id]) {
      return cachedData[id];
    } else {
      const { businesses } = await fetchBusinessByOrganization(id);
      setCachedDate((prevCache) => ({ ...prevCache, [id]: businesses }));
      return businesses;
    }
  };

  const getOrganizations = async () => {
    const { registered_organizations } = await fetchOrganizations();
    setOrganizations(registered_organizations);
  };

  useEffect(() => {
    getOrganizations();
  }, []);
  return (
    <Context.Provider value={{ organizations, getOrganizations, getOrgById }}>
      {children}
    </Context.Provider>
  );
};

export const useContextApi = () => useContext(Context);

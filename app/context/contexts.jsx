"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  fetchBusinessByOrganization,
  fetchOrganizations,
} from "../services/adminServices";
import { fetchItems } from "../services/etimsServices";

const Context = createContext({});

export const ContextProvider = ({ children }) => {
  const [organizations, setOrganizations] = useState([]);
  const [cachedData, setCachedDate] = useState({});
  const [items, setItems] = useState([]);

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
  useEffect(() => {
    const fetchItemsFunc = async () => {
      const { items } = await fetchItems();
      const transformedItems = items.map((item) => ({
        label: item.itemClassName,
        value: item.itemClassCode,
      }));
      setItems(transformedItems);
    };
    fetchItemsFunc();
  }, []);

  return (
    <Context.Provider
      value={{ organizations, getOrganizations, getOrgById, items }}
    >
      {children}
    </Context.Provider>
  );
};

export const useContextApi = () => useContext(Context);

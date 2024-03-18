"use client";

import React, { useEffect, useState } from "react";
import { TabsData } from "./tabsData";
import Item from "./components/Item";
import Sales from "./components/Sales";
import Purchases from "./components/Purchases";
import Customers from "./components/Customers";
import BranchList from "./components/BranchList";
import KRANotices from "./components/KRANotices";
import Insurance from "./components/Insurance";
import ImportList from "./components/ImportList";

const BusinessInfoPage = ({ params: { businessInfo: businessId } }) => {
  const [page, setPage] = useState("Item");

  const renderComponent = () => {
    switch (page) {
      case "Item":
        return <Item />;
      case "Sales/Credit Notes":
        return <Sales />;
      case "Purchases":
        return <Purchases />;
      case "Customers":
        return <Customers />;
      case "Branch List":
        return <BranchList />;
      case "KRA Notices":
        return <KRANotices />;
      case "Insurance":
        return <Insurance />;
      case "Import List":
        return <ImportList />;
      default:
        <Item />;
    }
  };

  const TabList = ({ name, onClick, active }) => {
    return (
      <div className="cursor-pointer" onClick={onClick}>
        <span
          className={`text-[18px]  hover:underline decoration-[#995224] ${
            active ? "underline decoration-[#995224] text-[#995224]" : ""
          }`}
        >
          {name}
        </span>
      </div>
    );
  };

  return (
    <div className="mt-[20px]">
      <div className="flex gap-6 justify-center">
        {TabsData.map((tabItem, index) => (
          <>
            <TabList
              key={index}
              name={tabItem.name}
              active={page === tabItem.name}
              component={tabItem.component}
              onClick={() => setPage(tabItem.name)}
            />
          </>
        ))}
      </div>
      {renderComponent()}
    </div>
  );
};

export default BusinessInfoPage;

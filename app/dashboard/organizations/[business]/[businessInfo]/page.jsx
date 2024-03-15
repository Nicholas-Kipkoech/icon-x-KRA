"use client";

import React, { useEffect, useState } from "react";
import { TabsData } from "./tabsData";
import Item from "./components/Item";
import Sales from "./components/Sales";
import Purchases from "./components/Purchases";
import CreditNotes from "./components/CreditNotes";
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
      case "Sales":
        return <Sales />;
      case "Purchases":
        return <Purchases />;
      case "Credit Notes":
        return <CreditNotes />;
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

  const TabList = ({ name, onClick }) => {
    return (
      <div className="cursor-pointer" onClick={onClick}>
        <span className="text-[18px] hover:underline">{name}</span>
      </div>
    );
  };

  return (
    <div className="m-[20px]">
      <div className="flex gap-4 justify-center">
        {TabsData.map((tabItem, index) => (
          <>
            <TabList
              key={index}
              name={tabItem.name}
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

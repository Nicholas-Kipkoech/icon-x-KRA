"use client";
import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { fetchFamilies, fetchSegments } from "@/app/services/adminServices";
import Segments from "./segments";
import Families from "./families";
import Classes from "./classes";
import Comodities from "./comodities";
const EtimsAdminOps = () => {
  const [tableState, setTableState] = useState("segment");

  const renderTable = () => {
    switch (tableState) {
      case "segment":
        return <Segments />;
      case "family":
        return <Families />;
      case "class":
        return <Classes />;
      case "comodity":
        return <Comodities />;
      default:
        return "null";
    }
  };

  return (
    <div>
      <p className="flex justify-center text-[30px] underline">
        ETIMS item classifications
      </p>
      <div className="flex justify-center">
        <div
          className="h-[40px] w-[100%] justify-center items-center flex cursor-pointer"
          style={{
            backgroundColor: tableState === "segment" ? "#dc9435" : "#7f7e7d",
          }}
          onClick={() => setTableState("segment")}
        >
          Segments
        </div>
        <div
          className="h-[40px] w-[100%] justify-center items-center flex border cursor-pointer"
          style={{
            backgroundColor: tableState === "family" ? "#dc9435" : "#7f7e7d",
          }}
          onClick={() => setTableState("family")}
        >
          Families
        </div>
        <div
          className="h-[40px] w-[100%] flex justify-center items-center cursor-pointer"
          style={{
            backgroundColor: tableState === "class" ? "#dc9435" : "#7f7e7d",
          }}
          onClick={() => setTableState("class")}
        >
          Classes
        </div>
        <div
          className="h-[40px] w-[100%] flex justify-center items-center cursor-pointer"
          style={{
            backgroundColor: tableState === "comodity" ? "#dc9435" : "#7f7e7d",
          }}
          onClick={() => setTableState("comodity")}
        >
          Comodities
        </div>
      </div>
      <div>{renderTable()}</div>
    </div>
  );
};

export default EtimsAdminOps;

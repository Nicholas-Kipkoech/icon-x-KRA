"use client";
import React, { useState } from "react";
import Navbar from "../ui/dashboard/navbar/navbar";
import Sidebar from "../ui/dashboard/sidebar/sidebar";

const Layout = ({ children }) => {
  const [hide, setHide] = useState(false);
  return (
    <div className=" flex">
      <div
        className={`top-0 sticky transition-opacity duration-75 ${
          hide ? "hidden" : "block"
        }`}
      >
        <Sidebar />
      </div>
      <div className="w-full">
        <Navbar hide={() => setHide((prev) => !prev)} />
        <div className="overflow-y-auto">
          {/* Set a max height if needed */}
          <div className="max-h-[calc(100vh-60px)] overflow-y-auto">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;

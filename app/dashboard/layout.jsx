import React from "react";
import Sidebar from "../ui/dashboard/sidebar/sidebar";
import Navbar from "../ui/dashboard/navbar/navbar";

const Layout = ({ children }) => {
  return (
    <div className=" flex">
      <div className="w-1/5 bg-[#d99a5b] p-[20px] h-[800px] top-0 bottom-0 sticky">
        <Sidebar />
      </div>
      <div className="w-4/5 p-[20px]">
        <Navbar />
        {children}
      </div>
    </div>
  );
};

export default Layout;

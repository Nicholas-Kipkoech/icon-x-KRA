import React from "react";
import Sidebar from "../ui/dashboard/sidebar/sidebar";
import Navbar from "../ui/dashboard/navbar/navbar";

const Layout = ({ children }) => {
  return (
    <div className=" flex m-2">
      <div className="w-1/5 bg-[#d99a5b] p-[20px] h-[100vh]">
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

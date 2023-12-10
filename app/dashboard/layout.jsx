import React from "react";
import Sidebar from "../ui/dashboard/sidebar/sidebar";
import Navbar from "../ui/dashboard/navbar/navbar";

const Layout = ({ children }) => {
  return (
    <div className=" flex">
      <div className="w-1/5  top-0 bottom-0 sticky">
        <Sidebar />
      </div>
      <div className="w-4/5 p-[20px]">
        <Navbar />
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

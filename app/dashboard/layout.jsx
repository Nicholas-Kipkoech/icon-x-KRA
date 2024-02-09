"use client";
import React, { useEffect, useRef, useState } from "react";
import Navbar from "../ui/dashboard/navbar/navbar";
import Sidebar from "../ui/dashboard/sidebar/sidebar";
import { Drawer } from "@material-tailwind/react";

const Layout = ({ children }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const drawerRef = useRef(null);

  const handleClickOutsideDrawer = (event) => {
    if (drawerRef.current && !drawerRef.current.contains(event.target)) {
      setShowDrawer(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideDrawer);

    return () => {
      document.removeEventListener("mousedown", handleClickOutsideDrawer);
    };
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust the width based on your mobile breakpoint
    };
    checkMobile(); // Initial check
    // Listen for window resize events
    window.addEventListener("resize", checkMobile);

    return () => {
      // Remove the event listener on component unmount
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  return (
    <div className="relative flex">
      {isMobile ? (
        <Drawer
          open={showDrawer}
          onClose={() => setShowDrawer(false)}
          className="w-64 bg-gray-800 text-white"
          ref={drawerRef}
        >
          <Sidebar clicked={() => setShowDrawer(false)} />
        </Drawer>
      ) : (
        <div
          className={`top-0 sticky  transition-opacity duration-75 ${
            showDrawer ? "hidden" : "block"
          } `}
        >
          <Sidebar />
        </div>
      )}

      <div className={`w-full`}>
        <Navbar showDrawer={() => setShowDrawer(!showDrawer)} />
        <div className="overflow-hidden">
          {/* Set a max height if needed */}
          <div className="max-h-[calc(100vh-60px)] p-2 overflow-auto">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;

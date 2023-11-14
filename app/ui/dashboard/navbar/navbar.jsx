"use client";
import { usePathname } from "next/navigation";
import React from "react";
import {
  MdNotifications,
  MdOutlineChat,
  MdPublic,
  MdSearch,
} from "react-icons/md";
const Navbar = () => {
  const pathname = usePathname();
  return (
    <div className="p-[20px] rounded-[10px] flex items-center justify-between bg-[#5e5f69] ">
      <div className="capitalize text-white font-bold">
        {pathname.split("/").pop()}
      </div>
      <div className="flex items-center gap-[20px]">
        <div className="flex gap-[20px] ">
          <MdNotifications size={30} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;

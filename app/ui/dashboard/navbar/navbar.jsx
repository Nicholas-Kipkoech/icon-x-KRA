"use client";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { IoMenu } from "react-icons/io5";
import { HiOutlineSwitchHorizontal } from "react-icons/hi";

import { jwtDecode } from "jwt-decode";
import CustomButton from "../../reusableComponents/CustomButton";
import { useCustomToast } from "@/app/hooks/useToast";

const Navbar = ({ showDrawer }) => {
  const [user, setUser] = useState({});
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const decoded_user = jwtDecode(token);
    setUser(decoded_user);
  }, []);

  // Function to format the last path segment with specific handling for IDs
  const formatPathSegment = (segment) => {
    // Check if the segment is an ID (24 characters hexadecimal)
    const isId = /^[0-9a-fA-F]{24}$/.test(segment);

    if (isId) {
      return "";
    }

    return segment;
  };

  const lastSegment = pathname.split("/").pop();
  const formattedLastSegment = formatPathSegment(lastSegment);

  const showToast = useCustomToast();
  const handleLogout = () => {
    showToast("Logging out successfully...");
    setTimeout(() => {
      localStorage.removeItem("access_token");
      router.push("/");
    }, 1000);
  };

  return (
    <div className="p-[20px]  flex items-center justify-between bg-[#094b6a]">
      <div className="capitalize flex gap-3 items-center text-white font-bold">
        <div className="flex items-center gap-2">
          <IoMenu size={30} onClick={showDrawer} className="cursor-pointer" />
        </div>
        {formattedLastSegment}
      </div>
      <div className="flex items-center gap-[20px]">
        <div className="flex items-center gap-3 ">
          <CustomButton
            className="text-white bg-[#cb7529] text-[16px]   w-[150px] h-[40px] items-center justify-center flex cursor-pointer rounded-md"
            onClick={handleLogout}
            name={"Logout"}
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;

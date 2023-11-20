"use client";
import React, { useEffect, useState } from "react";
import MenuLink from "./menuLink/menuLink";
import {
  MdAttachMoney,
  MdDashboard,
  MdHelpCenter,
  MdLogout,
  MdOutlineSettings,
  MdSupervisedUserCircle,
} from "react-icons/md";
import Image from "next/image";
import { useAuth } from "@/app/context/AuthContext";
import { jwtDecode } from "jwt-decode";

const menuItems = [
  {
    title: "Pages",
    list: [
      {
        title: "Dashboard",
        path: "/dashboard",
        icon: <MdDashboard />,
      },
      {
        title: "Users",
        path: "/dashboard/users",
        icon: <MdSupervisedUserCircle />,
      },
      {
        title: "Transactions",
        path: "/dashboard/transactions",
        icon: <MdAttachMoney />,
      },
    ],
  },
  {
    title: "User",
    list: [
      {
        title: "Settings",
        path: "/dashboard/settings",
        icon: <MdOutlineSettings />,
      },
      {
        title: "Help",
        path: "/dashboard/help",
        icon: <MdHelpCenter />,
      },
    ],
  },
];

const Sidebar = () => {
  const { logout } = useAuth();
  const [user, setUser] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const decoded_user = jwtDecode(token);
    setUser(decoded_user);
  }, []);

  const handleLogout = () => {
    logout();
  };
  return (
    <div className="sticky top-[40px]">
      <div className="flex items-center gap-[20px] mb-[20px] bg-amber-300 h-[100px] p-[20px] rounded-md">
        {Object.keys(user).length > 1 ? (
          <>
            <Image
              src={
                "https://png.pngtree.com/png-vector/20190223/ourmid/pngtree-profile-line-black-icon-png-image_691065.jpg"
              }
              alt=""
              width="50"
              height="50"
              className="rounded-[50%] object-cover"
            />
            <div className="flex flex-col">
              <span className="font-[500] text-[20px]">{user.name}</span>
              <span className="text-[14px] text-[#000000] font-[600]">
                {user.role}
              </span>
            </div>
          </>
        ) : (
          <p>Loading user....</p>
        )}
      </div>

      <ul className="list-none">
        {menuItems.map((cat) => (
          <li key={cat.title}>
            <span>{cat.title}</span>
            {cat.list.map((item) => (
              <MenuLink item={item} key={item.title} />
            ))}
          </li>
        ))}
      </ul>
      <div
        className="flex gap-[10px] cursor-pointer p-[20px] items-center border-none rounded-[10px] m-[5px]  w-[100%] text-white bg-[#404746] mt-20"
        onClick={handleLogout}
      >
        <MdLogout size={30} />
        Logout
      </div>
    </div>
  );
};

export default Sidebar;

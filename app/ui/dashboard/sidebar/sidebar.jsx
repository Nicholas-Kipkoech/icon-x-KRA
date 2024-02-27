"use client";
import React, { useEffect, useState } from "react";
import MenuLink from "./menuLink/menuLink";
import {
  Md60FpsSelect,
  MdAdminPanelSettings,
  MdArchitecture,
  MdAttachMoney,
  MdBusiness,
  MdDashboard,
  MdHelpCenter,
  MdLogout,
  MdOutlineSettings,
  MdPerson,
} from "react-icons/md";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import iconLogo from "../../../assets/iconLogo.png";
import { GrOverview } from "react-icons/gr";
import { FaUsers } from "react-icons/fa6";
import { FaServer } from "react-icons/fa";
import { LiaFileInvoiceSolid } from "react-icons/lia";

const Sidebar = ({ clicked }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const decoded_user = jwtDecode(token);
    setUser(decoded_user);
  }, []);

  console.log(user);

  const menuItems = [
    {
      title: "Pages",
      list: [
        {
          title: "Overview",
          path: "/dashboard",
          icon: <GrOverview />,
        },
      ],
    },
    {
      title: "ETIMS Management",
      list: [
        {
          title: "Admin Crud Ops",
          path: "/dashboard/organizations",
          icon: <MdAdminPanelSettings />,
        },
        {
          title: "View transactions",
          path: "/dashboard/transactions",
          icon: <LiaFileInvoiceSolid />,
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
      ],
    },
    {
      title: user?.role === "Superadmin" ? "Company Settings" : "",
      list:
        user?.role === "Superadmin"
          ? [
              {
                title: "Enrolled Organizations",
                path: "/dashboard/organizations",
                icon: <MdBusiness />,
              },
              // Add more items as needed
            ]
          : [], // Empty array if not a superadmin
    },
  ];

  return (
    <div className="sticky top-0 h-[100vh] w-[300px]  bg-[#092332] p-[5px] ">
      <div className="flex justify-center items-center">
        <Image src={iconLogo} height={"120"} width={"120"} alt="" />
      </div>
      <div className="flex items-center gap-[20px]  justify-center text-[#cb7529] h-[100px] p-[10px] rounded-md">
        {Object.keys(user).length > 1 && (
          <>
            <div className="flex flex-col gap-1 justify-center">
              <span className="font-[500] flex justify-center text-[15px]">
                {user.firstName.toUpperCase()} {user.lastName.toUpperCase()}
              </span>
              <span className="font-[500] text-[12px] flex justify-center text-white">
                {user.role.toUpperCase()}
              </span>
            </div>
          </>
        )}
      </div>

      <ul className="list-none ">
        {menuItems.map((cat) => (
          <li key={cat.title} className="text-white">
            <span>{cat.title}</span>
            {cat.list.map((item) => (
              <MenuLink item={item} key={item.title} onClick={clicked} />
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;

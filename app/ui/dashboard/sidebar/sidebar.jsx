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

const Sidebar = () => {
  const [user, setUser] = useState({});
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const decoded_user = jwtDecode(token);
    setUser(decoded_user);
  }, []);

  const menuItems = [
    {
      title: "Pages",
      list: [
        {
          title: "Overview",
          path: "/dashboard",
          icon: <MdDashboard />,
        },
        {
          title: "Users",
          path: "/dashboard/users",
          icon: <MdPerson />,
        },
      ],
    },
    {
      title: "ETIMS Management",
      list:
        user?.role === "Superadmin"
          ? [
              {
                title: "API Testing",
                path: "/dashboard/testing",
                icon: <MdArchitecture />,
              },
              {
                title: "Admin Crud Ops",
                path: "/dashboard/admin-etims-ops",
                icon: <MdAdminPanelSettings />,
              },
              {
                title: "View transactions",
                path: "/dashboard/transactions",
                icon: <MdAttachMoney />,
              },
            ]
          : [
              {
                title: "Sales information",
                path: "/dashboard/etims-management",
                icon: <Md60FpsSelect />,
              },
              {
                title: "View transactions",
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

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    router.push("/");
  };
  return (
    <div className="sticky top-0 h-[100vh] max-h-[1200px]  bg-[#092332] p-[20px] ">
      <div className="flex items-center gap-[20px] mb-[20px] bg-[#cb7529] h-[100px] p-[20px] rounded-md">
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

      <ul className="list-none ">
        {menuItems.map((cat) => (
          <li key={cat.title} className="text-white">
            <span>{cat.title}</span>
            {cat.list.map((item) => (
              <MenuLink item={item} key={item.title} />
            ))}
          </li>
        ))}
      </ul>
      <div
        className="flex gap-[10px] cursor-pointer p-[20px] items-center text-center justify-center border-none rounded-[10px] m-[2px]  w-[100%] text-white bg-[#a01d1d] mt-[15px]"
        onClick={handleLogout}
      >
        <MdLogout size={30} />
        Logout
      </div>
    </div>
  );
};

export default Sidebar;

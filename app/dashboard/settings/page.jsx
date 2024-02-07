"use client";
import React, { useEffect, useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { CiLock } from "react-icons/ci";
import { RiTeamLine } from "react-icons/ri";
import Profile from "./Profile";
import { IoMenu } from "react-icons/io5";
import CustomButton from "@/app/ui/reusableComponents/CustomButton";
import Security from "./Security";
import { jwtDecode } from "jwt-decode";

const Settings = () => {
  const [component, setComponent] = useState("profile");
  const [title, setTitle] = useState("Profile");

  const renderComponent = () => {
    switch (component) {
      case "profile":
        return <Profile />;
      case "security":
        return <Security />;
      default:
        throw Error("page null");
    }
  };

  const [user, setUser] = useState({});
  useEffect(() => {
    const access_token = localStorage.getItem("access_token");
    const userObj = jwtDecode(access_token);
    setUser(userObj);
  }, []);

  const CustomNav = ({ name, about, icon, onClick }) => {
    return (
      <div
        className={`border sm:w-[180px] md:w-full  p-6 border-slate-200 cursor-pointer flex hover:text-white hover:bg-[#cb7529] `}
        onClick={onClick}
      >
        <div className="">{icon}</div>
        <div className="pl-1">
          <p className="font-bold">{name}</p>
          <p className="text-gray-700 sm:text-[10px] md:text-[15px] hover:text-white">
            {about}
          </p>
        </div>
      </div>
    );
  };
  const ProfileMenu = () => {
    return (
      <>
        {user.role === "Superadmin" && (
          <CustomNav
            icon={<FaRegUserCircle size={30} />}
            name={"Profile"}
            onClick={() => {
              setComponent("profile");
              setTitle("Profile");
            }}
            about={"Manage your personal information"}
          />
        )}
        <CustomNav
          icon={<CiLock size={30} />}
          name={"Security"}
          onClick={() => {
            setComponent("security");
            setTitle("Security");
          }}
          about={"Manage your password and 2-step verification preferences"}
        />
        <div className="hidden">
          <CustomNav
            icon={<RiTeamLine size={30} />}
            name={"Team"}
            about={"Manage your team. Change roles/permissions"}
          />
        </div>
      </>
    );
  };
  return (
    <div className="flex mt-2 h-screen">
      <div className="w-1/3 h-[100vh]  gap-2 flex flex-col">
        <ProfileMenu />
      </div>
      <div className="w-2/3  p-2 overflow-hidden">
        <div className="flex items-center gap-2">
          <p className="text-[28px] sm:text-[20px]">{title}</p>
        </div>
        <>{renderComponent()}</>
        <div className="mt-[12px] flex gap-[10px] justify-end mb-[20px]">
          <CustomButton
            name={"Cancel"}
            className={
              "h-[40px] w-[200px] md:w-[250px] lg:w-[400px] rounded bg-[#094b6a] text-white"
            }
          />
          <CustomButton
            name={"Update"}
            className={
              "h-[40px] w-[200px] md:w-[250px] lg:w-[400px] rounded bg-[#cb7529] text-white"
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Settings;

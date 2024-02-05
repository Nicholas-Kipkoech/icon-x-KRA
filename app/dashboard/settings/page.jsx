"use client";
import React, { useState } from "react";

import { FaRegUserCircle } from "react-icons/fa";
import { CiLock } from "react-icons/ci";
import { RiTeamLine } from "react-icons/ri";
import Profile from "./Profile";
import { IoMenu } from "react-icons/io5";
import CustomButton from "@/app/ui/reusableComponents/CustomButton";
import Security from "./Security";

const Settings = () => {
  const [component, setComponent] = useState("profile");
  const [title, setTitle] = useState("Profile");
  const [showMenu, setShowMenu] = useState(false);

  const renderComponent = () => {
    switch (component) {
      case "profile":
        return <Profile />;
      case "security":
        return <Security />;
      default:
        break;
    }
  };

  const CustomNav = ({ name, about, icon, onClick }) => {
    return (
      <div
        className="border p-6 border-slate-200 cursor-pointer flex hover:text-white hover:bg-[#cb7529] "
        onClick={onClick}
      >
        <div className="">{icon}</div>
        <div className="pl-1">
          <p className="font-bold">{name}</p>
          <p className="text-slate-600 hover:text-white">{about}</p>
        </div>
      </div>
    );
  };
  const ProfileMenu = () => {
    return (
      <>
        <CustomNav
          icon={<FaRegUserCircle size={30} />}
          name={"Profile"}
          onClick={() => {
            setComponent("profile");
            setTitle("Profile");
          }}
          about={"Manage your personal information"}
        />
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
      <div className="w-2/3 p-2 overflow-auto">
        <div className="flex items-center gap-2">
          <IoMenu size={30} className="hidden" />
          <p className="text-[28px]">{title}</p>
        </div>
        <p>{renderComponent()}</p>
        <div className="mt-[12px] flex gap-[10px] justify-end mb-[20px]">
          <CustomButton
            name={"Cancel"}
            className={"h-[40px] w-[200px] rounded bg-[#094b6a] text-white"}
          />
          <CustomButton
            name={"Update"}
            className={"h-[40px] w-[200px] rounded bg-[#cb7529] text-white"}
          />
        </div>
      </div>
    </div>
  );
};

export default Settings;

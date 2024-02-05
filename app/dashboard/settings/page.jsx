"use client";
import React, { useState } from "react";

import { FaRegUserCircle } from "react-icons/fa";
import { CiLock } from "react-icons/ci";
import { RiTeamLine } from "react-icons/ri";
import Profile from "./Profile";

const Settings = () => {
  const [component, setComponent] = useState("profile");

  const renderComponent = () => {
    switch (component) {
      case "profile":
        return <Profile />;
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
  return (
    <div className="flex mt-2 h-screen">
      <div className="w-1/3 h-[100vh] gap-2 flex flex-col">
        <CustomNav
          icon={<FaRegUserCircle size={30} />}
          name={"Profile"}
          onClick={() => setComponent("profile")}
          about={"Manage your personal information"}
        />
        <CustomNav
          icon={<CiLock size={30} />}
          name={"Security"}
          about={"Manage your password and 2-step verification preferences"}
        />
        <CustomNav
          icon={<RiTeamLine size={30} />}
          name={"Team"}
          about={"Manage your team. Change roles/permissions"}
        />
      </div>
      <div className="w-2/3 p-2 overflow-auto">
        <p>{renderComponent()}</p>
      </div>
    </div>
  );
};

export default Settings;

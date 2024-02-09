"use client";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { MdLogout, MdNotifications } from "react-icons/md";
import { useRouter } from "next/navigation";
import { io } from "socket.io-client";
import NotificationBadge from "react-notification-badge";
import { Effect } from "react-notification-badge";
import Notifications from "./notifications";
import {
  fetchNotifications,
  fetchNotificationsByID,
} from "@/app/services/etimsServices";
import { IoMenu } from "react-icons/io5";
import { HiOutlineSwitchHorizontal } from "react-icons/hi";

import { jwtDecode } from "jwt-decode";
import CustomButton from "../../reusableComponents/CustomButton";

const ENDPOINT = "https://api-1jg9.onrender.com";

export const socket = io(ENDPOINT); // Replace with your server URL

const Navbar = ({ showDrawer }) => {
  const [count, setCount] = useState(0);
  const [openNotication, setOpenNotification] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const [user, setUser] = useState({});
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const decoded_user = jwtDecode(token);
    setUser(decoded_user);
  }, []);

  useEffect(() => {
    const getNotifications = async () => {
      const { notifications } = await fetchNotifications();
      setNotifications(notifications);
    };
    socket.on("notification", () => {
      getNotifications();
    });
    getNotifications();
  }, [user]);

  // Function to format the last path segment with specific handling for IDs
  const formatPathSegment = (segment) => {
    // Check if the segment is an ID (24 characters hexadecimal)
    const isId = /^[0-9a-fA-F]{24}$/.test(segment);

    if (isId) {
      return "Item Details";
    }

    return segment;
  };

  const lastSegment = pathname.split("/").pop();
  const formattedLastSegment = formatPathSegment(lastSegment);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    router.push("/");
  };

  socket.on("connect", () => {
    console.log("Connected to the Socket.io server");
    socket.emit("join", "Hello, server! I'm connected!");
  });

  socket.on("test", (data) => {
    setCount(count + 1);
  });

  return (
    <div className="p-[20px]  flex items-center justify-between bg-[#094b6a]">
      <div className="capitalize flex gap-3 items-center text-white font-bold">
        <div className="flex items-center gap-2">
          <IoMenu size={30} onClick={showDrawer} className="cursor-pointer" />
          <HiOutlineSwitchHorizontal size={25} className="cursor-pointer" />
        </div>
        {formattedLastSegment}
      </div>
      <div className="flex items-center gap-[20px]">
        <div
          className="gap-[2px]  text-white cursor-pointer"
          onClick={() => setOpenNotification(true)}
        >
          <NotificationBadge
            count={notifications.length}
            effect={Effect.SCALE}
          />
          <MdNotifications size={40} />
        </div>
        <div className="flex items-center gap-3 ">
          <CustomButton
            className="text-white bg-[#cb7529] 2xl:text-[18px] p-[5px] md:w-[100px]  w-[100px] 2xl:w-[170px] 2xl:h-[50px] items-center justify-center flex cursor-pointer rounded-md"
            onClick={handleLogout}
            name={"Logout"}
          />
        </div>
      </div>
      <Notifications
        open={openNotication}
        handleClose={() => setOpenNotification(false)}
      />
    </div>
  );
};

export default Navbar;

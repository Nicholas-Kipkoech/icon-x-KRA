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

import { jwtDecode } from "jwt-decode";

const ENDPOINT = "https://etims-icon.onrender.com";
const LOCAL_URL = "http://localhost:5000";
export const socket = io(ENDPOINT); // Replace with your server URL

const Navbar = () => {
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
    <div className="p-[20px] rounded-[10px] flex items-center justify-between bg-[#094b6a]">
      <div className="capitalize text-white font-bold">
        {formattedLastSegment}
      </div>
      <div className="flex items-center gap-[20px]">
        <div
          className="gap-[2px] text-white cursor-pointer"
          onClick={() => setOpenNotification(true)}
        >
          <NotificationBadge
            count={notifications.length}
            effect={Effect.SCALE}
          />
          <MdNotifications size={40} />
        </div>
        <div className="flex items-center gap-3 ">
          <p
            className="text-white bg-[#cb7529] p-[5px] w-[100px] justify-center flex cursor-pointer rounded-md"
            onClick={handleLogout}
          >
            Logout
          </p>
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

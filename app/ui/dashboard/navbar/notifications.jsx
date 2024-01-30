"use client";
import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import {
  fetchNotifications,
  fetchNotificationsByID,
} from "@/app/services/etimsServices";
import { socket } from "./navbar";
import { formatDistanceToNow } from "date-fns";
import { TbMoodEmptyFilled } from "react-icons/tb";
import { jwtDecode } from "jwt-decode";

const Notifications = ({ open, handleClose, onread }) => {
  const [notifications, setNotifications] = useState([]);
  const [user, setUser] = useState({});

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

  // Replace with your server URL
  socket.on("connect", () => {
    console.log("Connected to the Socket.io server");
    socket.emit("join", "Hello, server! I'm connected!");
  });

  return (
    <Modal
      open={open}
      footer
      title="API Notifications"
      width={800}
      onCancel={handleClose}
    >
      <div className="h-[auto] max-h-[300px]  w-[100%] overflow-auto scroll-smooth">
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <div
              key={notification._id}
              className="flex items-center text-[14px] gap-2 bg-[#ebe7e4] h-[60px] rounded-md p-[5px] m-[3px]"
            >
              <span className="font-bold ">
                {user.role === "Superadmin" && notification.from}
              </span>
              <span className="text-[grey]">{notification.message}</span>
              <span className="text-[#367ed1] ml-5">
                {formatDistanceToNow(notification.send_date)} ago
              </span>
            </div>
          ))
        ) : (
          <p className="flex justify-center items-center text-[30px]">
            <TbMoodEmptyFilled size={50} />
            No notifications!
          </p>
        )}
      </div>
    </Modal>
  );
};

export default Notifications;

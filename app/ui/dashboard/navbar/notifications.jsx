"use client";
import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import { fetchNotifications } from "@/app/services/etimsServices";
import { socket } from "./navbar";

const Notifications = ({ open, handleClose, onread }) => {
  const [notifications, setNotifications] = useState([]);

  const getNotifications = async () => {
    const { notifications } = await fetchNotifications();
    setNotifications(notifications);
  };
  useEffect(() => {
    getNotifications();
  }, []);

  // Replace with your server URL
  socket.on("connect", () => {
    console.log("Connected to the Socket.io server");
    socket.emit("join", "Hello, server! I'm connected!");
  });
  socket.on("notification", () => {
    getNotifications();
  });

  const formatCustomDate = (serverTime) => {
    const date = new Date(serverTime);
    const formattedDate = date.toLocaleString("en-US");
    return formattedDate;
  };

  return (
    <Modal
      open={open}
      width={650}
      footer
      title="API Notifications"
      onCancel={handleClose}
    >
      <div className="h-[250px] overflow-auto scroll-smooth">
        {notifications
          .sort((a, b) => new Date(b.send_date) - new Date(a.send_date))
          .map((notification) => (
            <div
              key={notification._id}
              className="flex items-center text-[16px] gap-2 bg-[whitesmoke] h-[50px] rounded-sm p-[5px] m-[3px]"
            >
              <span className="font-bold">{notification.from}:</span>
              <span className="text-[grey]">{notification.message}</span>
              <span className="text-[#cf8743] ml-5">
                {formatCustomDate(notification.send_date)}
              </span>
            </div>
          ))}
      </div>
    </Modal>
  );
};

export default Notifications;

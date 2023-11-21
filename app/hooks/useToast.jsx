"use client";
import { toast } from "react-toastify";

export const useCustomToast = () => {
  const showToast = (message, type = "success") => toast(message, { type });
  return showToast;
};

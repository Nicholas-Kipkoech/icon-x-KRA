"use client";

import axios from "axios";

export const ENDPOINT = "https://etims-icon.onrender.com/api";
export const LOCAL_URL = "http://localhost:5000/api";

export const PrivateAxiosUtility = axios.create({
  baseURL: `${ENDPOINT}`,
  timeout: 600000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const AxiosUtility = axios.create({
  baseURL: `${ENDPOINT}`,
  timeout: 600000,
  headers: {
    "Content-Type": "application/json",
  },
});

PrivateAxiosUtility.interceptors.request.use(async (req) => {
  const state = await localStorage?.getItem("access_token");

  let token;
  // check if access-token exists
  if (state) {
    token = state;
    req.headers.Authorization = `Bearer ${token}`;
  }
  req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export default AxiosUtility;

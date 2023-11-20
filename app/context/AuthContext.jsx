// utils/authContext.js
"use client";
import { useRouter } from "next/navigation";
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();
const url = "https://etims-icon.onrender.com";

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const router = useRouter();
  const login = async (email, password) => {
    // Make an API call to the login endpoint
    // Use the BASE_URL and appropriate endpoint for login
    const response = await fetch(`${url}/api/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const userData = await response.json();
      localStorage.setItem("access_token", userData.access_token);
      router.push("/dashboard");
    } else {
      // Handle login failure
      console.error("Login failed");
    }
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    router.push("/");
  };

  const isAuthenticated = () => !!token;

  return (
    <AuthContext.Provider value={{ token, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

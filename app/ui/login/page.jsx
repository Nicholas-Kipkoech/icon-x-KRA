"use client";
import React, { useState } from "react";
import CustomInput from "../reusableComponents/CustomInput";
import CustomButton from "../reusableComponents/CustomButton";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useCustomToast } from "@/app/hooks/useToast";
import { Spin } from "antd";
import { ENDPOINT } from "@/app/services/axiosUtility";

const Login = ({ toggleView }) => {
  const showToast = useCustomToast();

  const [showPassword, setShowPassword] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const router = useRouter();
  const handleLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post(`${ENDPOINT}/user/login`, {
        email,
        password,
      });
      if (response.status === 200) {
        const userData = response.data;
        localStorage.setItem("access_token", userData.access_token);
        if (userData.success === true) {
          showToast("Logged in successfully!");
          setTimeout(() => {
            router.push("/dashboard");
          }, 2000);
        }
      }
    } catch (error) {
      showToast(error?.response?.data?.error, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-[600px] border-2 rounded-md w-[auto]   bg-white">
      <div className="flex flex-col justify-center items-center pt-8">
        <p className="text-[28px] font-bold">Welcome back!!!</p>
        <div className="flex flex-col items-center justify-center text-[grey]">
          <p>Glad to see you again 👋</p>
          <p>Login to your account below</p>
        </div>
      </div>
      <form className="h-[400px] mt-2 p-10 flex flex-col">
        <Spin spinning={loading} delay={500}>
          <CustomInput
            name={`Email`}
            value={email}
            required
            onchange={(e) => setEmail(e.target.value)}
            type={`email`}
            className={`h-[50px] sm:w-[400px] border p-5 rounded-md`}
            placeholder={`Enter email...`}
          />

          <CustomInput
            name={`Password`}
            value={password}
            required
            onchange={(e) => setPassword(e.target.value)}
            type={showPassword ? `text` : `password`}
            placeholder={`Enter password...`}
            className={`h-[50px] sm:w-[400px] border p-5 rounded-md`}
          />
        </Spin>

        <div className="flex gap-2 mt-8">
          <input
            type="checkbox"
            checked={showPassword}
            onChange={toggleShowPassword}
          />
          <label>Show password</label>
        </div>
        <div className="mt-10">
          <CustomButton
            name={loading ? `Logging in..` : `Login`}
            type={`button`}
            className={`h-[45px] sm:w-[400px] rounded-md bg-[#cb7529] font-[600] text-[white] text-[20px]`}
            onClick={handleLogin}
            disabled={loading}
          />
        </div>
        <div className="flex mt-3 justify-center ">
          <p>Dont have an account?</p>
          <p onClick={toggleView} className="text-[blue] cursor-pointer">
            Signup
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;

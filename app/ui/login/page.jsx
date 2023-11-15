"use client";
import React, { useState } from "react";
import CustomInput from "../reusableComponents/CustomInput";
import CustomButton from "../reusableComponents/CustomButton";
import { useRouter } from "next/navigation";

const Login = () => {
  const [showPassword, setShowPassword] = useState("");

  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const router = useRouter();
  const handleLogin = () => {
    router.push("/dashboard");
  };

  return (
    <div className="h-[600px] border-2 rounded-md w-[auto] bg-white">
      <div className="flex flex-col justify-center items-center pt-8">
        <p className="text-[28px] font-bold">Welcome back!!!</p>
        <div className="flex flex-col items-center justify-center text-[grey]">
          <p>Glad to see you again 👋</p>
          <p>Login to your account below</p>
        </div>
      </div>
      <form className="h-[400px] mt-2 p-10 flex flex-col">
        <CustomInput
          name={`Email`}
          type={`email`}
          className={`h-[60px] w-[600px] border p-5 rounded-md`}
          placeholder={`Enter email...`}
        />

        <CustomInput
          name={`Password`}
          type={showPassword ? `text` : `password`}
          placeholder={`Enter password...`}
          className={`h-[60px] w-[600px] border p-5 rounded-md`}
        />
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
            name={"Login"}
            type={`button`}
            className={`h-[60px] w-[600px] rounded-md bg-orange-300 font-[600] text-[#1c2536] text-[20px]`}
            onClick={handleLogin}
          />
        </div>
      </form>
    </div>
  );
};

export default Login;

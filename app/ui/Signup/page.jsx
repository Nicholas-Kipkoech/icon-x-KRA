"use client";
import React, { useState } from "react";
import CustomInput from "../reusableComponents/CustomInput";
import CustomButton from "../reusableComponents/CustomButton";
import axios from "axios";
import { updateUser } from "@/app/services/adminServices";
import { useCustomToast } from "@/app/hooks/useToast";

const url = "https://etims-icon.onrender.com";

const Signup = ({ toggleView }) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [loading, setLoading] = useState(false);

  const showToast = useCustomToast();

  const handleUpdateUser = async () => {
    setLoading(true);
    if (password !== password2) {
      showToast("Password should be the same!!", "error");
    }
    let formData = new FormData();
    formData.append("name", name);
    formData.append("newPassword", password);
    const response = await updateUser(formData);
    if (response?.success) {
      setLoading(false);
      showToast("Account updated successfully!!");
      toggleView();
    } else {
      showToast("Something went wrong!!", "error");
    }
  };

  return (
    <div className="h-[600px] border-2 rounded-md w-[1000px] bg-white">
      <div className="flex flex-col justify-center items-center pt-8">
        <p className="text-[28px] font-bold">Update your account</p>
        <div className="flex flex-col items-center justify-center text-[grey]">
          <p>Enter your details below to update your account and get started</p>
        </div>
      </div>
      <form className="h-[400px] mt-2 p-5 flex flex-col items-center justify-center">
        <div className="flex gap-2 flex-wrap items-center justify-center">
          <CustomInput
            name={`Full Name`}
            type={`text`}
            value={name}
            onchange={(e) => setName(e.target.value)}
            className={`h-[50px] w-[350px] border p-5 rounded-md`}
            placeholder={`Enter full names...`}
          />

          <CustomInput
            name={`Email`}
            type={`Email`}
            placeholder={`Enter email...`}
            className={`h-[50px] w-[350px] border p-5 rounded-md`}
          />
          <CustomInput
            name={`Password`}
            type={`password`}
            value={password}
            onchange={(e) => setPassword(e.target.value)}
            className={`h-[50px] w-[350px] border p-5 rounded-md`}
            placeholder={`Enter password...`}
          />

          <CustomInput
            name={`Confirm Password`}
            type={`password`}
            value={password2}
            onchange={(e) => setPassword2(e.target.value)}
            placeholder={`Confirm password...`}
            className={`h-[50px] w-[350px] border p-5 rounded-md`}
          />
        </div>
        <div className="mt-10 flex gap-2">
          <CustomButton
            name={"Cancel"}
            type={`button`}
            className={`h-[50px] w-[350px] rounded-md bg-[grey] font-[600] text-white text-[20px]`}
            onClick={toggleView}
          />
          <CustomButton
            name={loading ? `Updating...` : `Update`}
            type={`button`}
            onClick={handleUpdateUser}
            className={`h-[50px] w-[350px] rounded-md bg-orange-300 font-[600] text-[#1c2536] text-[20px]`}
          />
        </div>
      </form>
    </div>
  );
};

export default Signup;

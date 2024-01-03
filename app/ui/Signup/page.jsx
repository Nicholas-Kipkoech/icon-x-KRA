"use client";
import React, { useState } from "react";
import CustomInput from "../reusableComponents/CustomInput";
import CustomButton from "../reusableComponents/CustomButton";
import { useCustomToast } from "@/app/hooks/useToast";
import { Select } from "antd";

const url = "https://etims-icon.onrender.com";

const Signup = ({ toggleView }) => {
  const [loading, setLoading] = useState(false);

  const showToast = useCustomToast();

  return (
    <div className="h-[600px] border-2 rounded-md w-[1000px] bg-white">
      <div className="flex flex-col justify-center items-center pt-8">
        <p className="text-[28px] font-bold">Create your account</p>
        <div className="flex flex-col items-center justify-center text-[grey]">
          <p>Enter your details below to create your account and get started</p>
        </div>
      </div>
      <form className="h-[500px] mt-2 p-5 flex flex-col items-center justify-center">
        <div className="flex gap-2  flex-wrap items-center justify-center">
          <CustomInput
            name={`Organization Name`}
            required
            type={`text`}
            className={`h-[50px] w-[350px] border p-5 rounded-md`}
          />
          <CustomInput
            required
            name={`Organization Email`}
            type={`text`}
            className={`h-[50px] w-[350px] border p-5 rounded-md`}
          />{" "}
          <CustomInput
            required
            name={`Organization Email`}
            type={`text`}
            className={`h-[50px] w-[350px] border p-5 rounded-md`}
          />{" "}
          <CustomInput
            required
            name={`Organization Phone`}
            type={`text`}
            className={`h-[50px] w-[350px] border p-5 rounded-md`}
          />{" "}
          <div className="flex flex-col">
            <label>Segment</label>
            <Select className="h-[50px] w-[350px]  rounded-md" />
          </div>
          <div className="flex flex-col">
            <label>Family of Business</label>
            <Select className="h-[50px] w-[350px]  rounded-md" />
          </div>
          <div className="flex flex-col">
            <label>Class of Business</label>
            <Select className="h-[50px] w-[350px]  rounded-md" />
          </div>
          <CustomInput
            required
            name={`Company Location`}
            type={`text`}
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
            name={loading ? `Creating...` : `Create`}
            type={`button`}
            onClick={toggleView}
            className={`h-[50px] w-[350px] rounded-md bg-orange-300 font-[600] text-[#1c2536] text-[20px]`}
          />
        </div>
      </form>
    </div>
  );
};

export default Signup;

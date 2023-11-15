"use client";
import React, { useState } from "react";
import CustomInput from "../reusableComponents/CustomInput";
import CustomButton from "../reusableComponents/CustomButton";

const Signup = ({ toggleView }) => {
  return (
    <div className="h-[600px] border-2 rounded-md w-[1000px] bg-white">
      <div className="flex flex-col justify-center items-center pt-8">
        <p className="text-[28px] font-bold">Sign Up</p>
        <div className="flex flex-col items-center justify-center text-[grey]">
          <p>Enter your details below to create your account and get started</p>
        </div>
      </div>
      <form className="h-[400px] mt-2 p-5 flex flex-col items-center justify-center">
        <div className="flex gap-2 flex-wrap items-center justify-center">
          <CustomInput
            name={`Full Name`}
            type={`text`}
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
            name={`Date of Birth`}
            type={`date`}
            className={`h-[50px] w-[350px] border p-5 rounded-md`}
            placeholder={`Enter email...`}
          />

          <CustomInput
            name={`Phone Number`}
            type={`text`}
            placeholder={`+254 123 456`}
            className={`h-[50px] w-[350px] border p-5 rounded-md`}
          />
          <CustomInput
            name={`Password`}
            type={`password`}
            className={`h-[50px] w-[350px] border p-5 rounded-md`}
            placeholder={`Enter password...`}
          />

          <CustomInput
            name={`Confirm Password`}
            type={`password`}
            placeholder={`Confirm password...`}
            className={`h-[50px] w-[350px] border p-5 rounded-md`}
          />
        </div>
        <div className="mt-10 flex gap-2">
          <CustomButton
            name={"Cancel"}
            type={`button`}
            className={`h-[50px] w-[350px] rounded-md bg-[grey] font-[600] text-white text-[20px]`}
          />
          <CustomButton
            name={"Confirm"}
            type={`button`}
            className={`h-[50px] w-[350px] rounded-md bg-orange-300 font-[600] text-[#1c2536] text-[20px]`}
          />
        </div>
        <div className="flex gap-2 mt-5 justify-center">
          <p>Already have an account?</p>
          <a className="text-blue-800 cursor-pointer" onClick={toggleView}>
            Login
          </a>
        </div>
      </form>
    </div>
  );
};

export default Signup;

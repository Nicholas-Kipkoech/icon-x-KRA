"use client";
import React, { useState } from "react";
import CustomInput from "../reusableComponents/CustomInput";
import CustomButton from "../reusableComponents/CustomButton";
import { createUser } from "@/app/services/adminServices";
import { useCustomToast } from "@/app/hooks/useToast";

const Signup = ({ toggleView }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);

  const showToast = useCustomToast();
  const handleSubmit = async () => {
    try {
      setLoading(true);
      let formData = new FormData();
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("email", email);
      formData.append("role", "Admin");
      formData.append("password", password);
      formData.append("phoneNumber", phoneNumber);
      await createUser(formData);
      showToast("Account created successfully");
      toggleView();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  return (
    <div className="h-[600px]    border-2 rounded-md w-[700px]  bg-white">
      <div className="flex flex-col justify-center items-center pt-8">
        <p className="text-[28px] font-bold">Create your account</p>
        <div className="flex flex-col items-center justify-center text-[grey]">
          <p className="pb-2">to get started with IconTax</p>
        </div>
      </div>
      <form className="h-[500px]  mt-2 p-5 flex flex-col items-center justify-center">
        <div className="flex gap-2 flex-wrap   items-center justify-center">
          <CustomInput
            name={`First Name`}
            onchange={(e) => setFirstName(e.target.value)}
            required
            type={`text`}
            className={`h-[50px] w-[300px]  border p-5 rounded-md`}
          />
          <CustomInput
            required
            name={`Last Name`}
            onchange={(e) => setLastName(e.target.value)}
            type={`text`}
            className={`h-[50px] w-[300px]  border p-5 rounded-md`}
          />{" "}
          <CustomInput
            required
            name={`Email Address`}
            onchange={(e) => setEmail(e.target.value)}
            type={`email`}
            className={`h-[50px] w-[300px]  border p-5 rounded-md`}
          />{" "}
          <CustomInput
            required
            name={`Phone Number`}
            onchange={(e) => setPhoneNumber(e.target.value)}
            type={`text`}
            className={`h-[50px] w-[300px]  border p-5 rounded-md`}
          />{" "}
          <CustomInput
            required
            name={`Password`}
            onchange={(e) => setPassword(e.target.value)}
            type={`text`}
            className={`h-[50px] w-[300px]  border p-5 rounded-md`}
          />
          <div className="h-[50px] w-[300px]   p-5 rounded-md" />
        </div>
        <div className="mt-10 flex gap-2">
          <CustomButton
            name={loading ? "Creating account...." : "Create account"}
            type={`button`}
            onClick={handleSubmit}
            className={`h-[45px] w-[500px]  rounded-md bg-[#cb7529] font-[600] text-[white] text-[20px]`}
          />
        </div>
        <div className="flex text-[16px] mt-2 mb-[20px] pb-[30px]">
          <p>Already have an account?</p>
          <p className="text-[#5547d6] cursor-pointer" onClick={toggleView}>
            Login
          </p>
        </div>
      </form>
    </div>
  );
};

export default Signup;

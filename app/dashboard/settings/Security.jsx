"use client";
import { useCustomToast } from "@/app/hooks/useToast";
import { updateUser } from "@/app/services/adminServices";
import CustomButton from "@/app/ui/reusableComponents/CustomButton";
import CustomInput from "@/app/ui/reusableComponents/CustomInput";
import React, { useState } from "react";

const Security = () => {
  const [newPassword, setNewPassword] = useState("");
  const [newPassword2, setNewPassword2] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const showToast = useCustomToast();
  const handleUpdatePassword = async () => {
    try {
      setLoading(true);
      if (newPassword !== newPassword2) {
        showToast("Password  must be the same!!!", "error");
      }
      let formdata = new FormData();
      formdata.append("newPassword", newPassword);
      await updateUser(formdata);
      showToast("Password updated successfully!!");
      setNewPassword("");
      setNewPassword2("");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  return (
    <div className="mt-5">
      <p className="text-[18px]">Change your password</p>

      <p className="mt-2 text-[13px] text-[#8e8686]">
        You can only change your password twice within 24 hours!
      </p>

      <CustomInput
        name={"New password"}
        required
        value={newPassword2}
        disabled={loading}
        onchange={(e) => setNewPassword2(e.target.value)}
        type={showPassword ? "text" : "password"}
        className={"h-[50px] p-[5px] border rounded"}
      />

      <CustomInput
        name={"Confirm new password"}
        required
        disabled={loading}
        value={newPassword}
        onchange={(e) => setNewPassword(e.target.value)}
        type={showPassword ? "text" : "password"}
        className={"h-[50px] p-[5px] border rounded"}
      />
      <div className="mt-2 flex items-center gap-1">
        <input
          type="checkbox"
          onClick={() => setShowPassword((prev) => !prev)}
        />
        <label className="text-[13px]">
          {showPassword ? "Hide password" : "Show password"}
        </label>
      </div>
      <p className="mt-2 text-[13px] text-[#928989]">
        Minimum 8 characters. Must include numbers, letters and special
        characters.
      </p>
      <div className="mt-[12px] flex gap-[10px] justify-end mb-[20px]">
        <CustomButton
          name={"Cancel"}
          className={
            "h-[40px] w-[200px] md:w-[250px] lg:w-[400px] rounded bg-[#094b6a] text-white"
          }
        />
        <CustomButton
          name={loading ? "Updating..." : "Update Password"}
          onClick={handleUpdatePassword}
          disabled={loading}
          className={
            "h-[40px] w-[200px] md:w-[250px] lg:w-[400px] rounded bg-[#cb7529] text-white"
          }
        />
      </div>
    </div>
  );
};

export default Security;

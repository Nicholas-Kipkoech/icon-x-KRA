import CustomInput from "@/app/ui/reusableComponents/CustomInput";
import React from "react";

const Security = () => {
  return (
    <div className="mt-5">
      <p className="text-[18px]">Change your password</p>
      <p className="mt-2 text-[13px] text-[#8e8686]">
        You can only change your password twice within 24 hours!
      </p>

      <CustomInput
        name={"Current password"}
        required
        type={"password"}
        className={"h-[50px] p-[5px] border rounded"}
      />

      <CustomInput
        name={"New password"}
        required
        type={"password"}
        className={"h-[50px] p-[5px] border rounded"}
      />
      <p className="mt-2 text-[13px] text-[#928989]">
        Minimum 8 characters. Must include numbers, letters and special
        characters.
      </p>
    </div>
  );
};

export default Security;

import CustomInput from "@/app/ui/reusableComponents/CustomInput";
import React from "react";

const Profile = () => {
  return (
    <div>
      <p className="text-[30px] ">Profile</p>
      <div>
        <CustomInput
          name={"First Name"}
          required
          className={"h-[50px] border rounded-md p-[5px]"}
        />
        <CustomInput
          name={"Last Name"}
          required
          className={"h-[50px] border rounded-md p-[5px]"}
        />
        <div className="flex flex-wrap gap-2">
          <CustomInput
            name={"Title"}
            required
            className={"h-[50px] w-[373px] border rounded-md p-[5px]"}
          />
          <CustomInput
            name={"Company"}
            required
            className={"h-[50px] w-[373px] border rounded-md p-[5px]"}
          />
        </div>
        <div className="mt-2 flex flex-col">
          <label id="about">About</label>
          <textarea
            id="about"
            className="resize-none p-[5px] border h-[200px] rounded-md"
          ></textarea>
          <p className="text-slate-400 mt-2">
            Brief description for your profile.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;

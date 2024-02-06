import CustomButton from "@/app/ui/reusableComponents/CustomButton";
import CustomInput from "@/app/ui/reusableComponents/CustomInput";
import React from "react";

const Profile = () => {
  return (
    <>
      <CustomInput
        name={"First Name"}
        required
        className={"h-[50px]   border rounded-md p-[5px]"}
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
          className={
            "h-[50px] w-[373px] md:w-[500px] 2xl:w-[373px] lg:w-[373px]  border rounded-md p-[5px]"
          }
        />
        <CustomInput
          name={"Company"}
          required
          className={
            "h-[50px] w-[373px] md:w-[500px] 2xl:w-[373px] lg:w-[373px] border rounded-md p-[5px]"
          }
        />
      </div>
      <div className="mt-2 flex flex-col">
        <label id="about">About</label>
        <textarea
          id="about"
          className="resize-none outline-[#cb7529] sm:h-[120px] p-[5px] border h-[200px] rounded-md"
        ></textarea>
        <p className="text-gray-500 mt-2">
          Brief description for your profile.
        </p>
      </div>
      <p className="mt-10">Contact Information</p>
      <div className="flex flex-wrap gap-2">
        <CustomInput
          name={"Email"}
          required
          className={
            "h-[50px] w-[383px] md:w-[500px] 2xl:w-[383px] border rounded-md p-[5px]"
          }
        />
        <CustomInput
          name={"Phone"}
          required
          className={
            "h-[50px] w-[383px] md:w-[500px] 2xl:w-[383px] border rounded-md p-[5px]"
          }
        />
      </div>
    </>
  );
};

export default Profile;

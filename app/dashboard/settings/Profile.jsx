"use client";
import { fetchSuperAdmin } from "@/app/services/adminServices";
import CustomInput from "@/app/ui/reusableComponents/CustomInput";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";

const Profile = () => {
  const [superadmin, setSuperadmin] = useState({});
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [about, setAbout] = useState("");

  useEffect(() => {
    const access_token = localStorage.getItem("access_token");
    const decoded_user = jwtDecode(access_token);
    setUser(decoded_user);
  }, []);
  useEffect(() => {
    if (user) {
      const getSuperadmin = async () => {
        setLoading(true);
        const { superadmin } = await fetchSuperAdmin(user.email);
        setSuperadmin(superadmin);
        setLoading(false);
      };
      getSuperadmin();
    }
  }, [user]);

  useEffect(() => {
    if (superadmin) {
      setName(superadmin.name);
      setTitle(superadmin.title);
      setAbout(superadmin.about);
      setCompany(superadmin.company);
    }
  }, [superadmin]);

  return (
    <>
      <CustomInput
        name={"Full Name"}
        required
        value={name}
        disabled={loading}
        className={"h-[50px]   border rounded-md p-[5px]"}
      />
      <div className="flex flex-wrap gap-2">
        <CustomInput
          name={"Title"}
          disabled={loading}
          value={title}
          required
          className={
            "h-[50px] w-[373px] md:w-[500px] 2xl:w-[373px] lg:w-[373px]  border rounded-md p-[5px]"
          }
        />
        <CustomInput
          name={"Company"}
          disabled={loading}
          value={company}
          required
          className={
            "h-[50px] w-[373px] md:w-[500px] 2xl:w-[373px] lg:w-[373px] border rounded-md p-[5px]"
          }
        />
      </div>
      <div className="mt-2 flex flex-col">
        <label id="about">About</label>
        <textarea
          value={about}
          disabled={loading}
          id="about"
          className="resize-none outline-[#cb7529] sm:h-[120px] p-[5px] border h-[200px] rounded-md"
        ></textarea>
        <p className="text-gray-500 mt-2">
          Brief description for your profile.
        </p>
      </div>
    </>
  );
};

export default Profile;

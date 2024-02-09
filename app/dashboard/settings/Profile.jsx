"use client";
import { useCustomToast } from "@/app/hooks/useToast";
import {
  fetchSuperAdmin,
  updateSuperAdmin,
} from "@/app/services/adminServices";
import CustomButton from "@/app/ui/reusableComponents/CustomButton";
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
  const [updating, setUpdating] = useState(false);

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

  const showToast = useCustomToast();

  const handleUpdateAdmin = async () => {
    try {
      setUpdating(true);
      let formdata = new FormData();
      formdata.append("name", name);
      formdata.append("title", title);
      formdata.append("about", about);
      formdata.append("company", company);
      await updateSuperAdmin(user.email, formdata);
      setUpdating(false);
      showToast("Profile details updated successfully");
    } catch (error) {
      setUpdating(false);
      console.error(error);
    }
  };

  return (
    <>
      {user.role === "Superadmin" ? (
        <>
          <CustomInput
            name={"Full Name"}
            required
            value={name}
            disabled={loading || updating}
            onchange={(e) => setName(e.target.value)}
            className={"h-[50px]   border rounded-md p-[5px]"}
          />
          <div className="flex flex-wrap gap-2">
            <CustomInput
              name={"Title"}
              disabled={loading || updating}
              value={title}
              onchange={(e) => setTitle(e.target.value)}
              required
              className={
                "h-[50px] w-[373px] md:w-[500px] 2xl:w-[373px] lg:w-[373px]  border rounded-md p-[5px]"
              }
            />
            <CustomInput
              name={"Company"}
              disabled={loading || updating}
              value={company}
              onchange={(e) => setCompany(e.target.value)}
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
              disabled={loading || updating}
              id="about"
              onChange={(e) => setAbout(e.target.value)}
              className="resize-none outline-[#cb7529] sm:h-[120px] p-[5px] border h-[200px] rounded-md"
            ></textarea>
            <p className="text-gray-500 mt-2">
              Brief description for your profile.
            </p>
          </div>
        </>
      ) : (
        <>
          <CustomInput
            name={"Full Name"}
            required
            className={"h-[50px]   border rounded-md p-[5px]"}
          />
          <CustomInput
            name={"Phone Number"}
            required
            className={"h-[50px]   border rounded-md p-[5px]"}
          />
        </>
      )}
      <div className="mt-[12px] flex gap-[10px] justify-end mb-[20px]">
        <CustomButton
          name={"Cancel"}
          className={
            "h-[40px] w-[200px] md:w-[250px] lg:w-[400px] rounded bg-[#094b6a] text-white"
          }
        />
        <CustomButton
          name={updating ? "Updating..." : "Update profile"}
          onClick={handleUpdateAdmin}
          disabled={updating}
          className={
            "h-[40px] w-[200px] md:w-[250px] lg:w-[400px] rounded bg-[#cb7529] text-white"
          }
        />
      </div>
    </>
  );
};

export default Profile;

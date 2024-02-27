"use client";
import React, { useEffect, useState } from "react";
import { fetchOrganizations } from "@/app/services/adminServices";
import { month } from "@/app/ui/reusableFunctions/Utils";
import CustomButton from "@/app/ui/reusableComponents/CustomButton";

const OrganizationPage = () => {
  const [organizations, setOrganizations] = useState([]);

  useEffect(() => {
    const getOrganizations = async () => {
      const { registered_organizations } = await fetchOrganizations();
      setOrganizations(registered_organizations);
    };
    getOrganizations();
  }, []);

  const formatDate = (serverTime) => {
    const serverDate = new Date(serverTime);
    const date = serverDate.getDate();
    const months = month[serverDate.getMonth()];
    const year = serverDate.getFullYear();
    const formattedTime = `${date} ${months},${year}`;
    return formattedTime;
  };
  const formatTime = (serverTime) => {
    const serverDate = new Date(serverTime);
    const hours = serverDate.getHours();
    const minutes = serverDate.getMinutes();
    const seconds = serverDate.getSeconds();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedTime = `${hours}:${minutes}:${seconds} ${ampm}`;
    return formattedTime;
  };

  return (
    <div className="mt-[20px]">
      <CustomButton
        name={"Add Organization"}
        className={
          "bg-[#995224] text-white mb-2 p-[5px] rounded-md w-[250px] h-[40px]"
        }
      />
      <div className="flex gap-2 flex-wrap">
        {organizations.length > 0 &&
          organizations.map((organization) => (
            <div
              key={organization.id}
              className="border w-[320px] bg-[white] cursor-pointer rounded-md flex flex-col justify-center p-[25px]  h-[230px]"
            >
              <p>Organization</p>
              <p className="font-[800]">{organization.organization_name}</p>

              <div className="flex justify-between mt-2">
                <div>
                  <p>Date created</p>
                  <p className="font-[800]">
                    {formatDate(organization.created_at)}
                  </p>
                </div>
                <div>
                  <p>Time created</p>
                  <p className="font-[800]">
                    {formatTime(organization.created_at)}
                  </p>
                </div>
              </div>
              <div className="flex justify-between mt-2">
                <div>
                  <p>Type</p>
                  <p className="font-[800]">{organization.organization_type}</p>
                </div>
                <div>
                  <p>No of Business</p>
                  <p className="font-[800]">2</p>
                </div>
              </div>
            </div>
          ))}
        <div className="border w-[320px] bg-white cursor-pointer rounded-md flex flex-col items-center justify-center h-[230px]">
          <p>+</p>
          <p>Add Organization</p>
        </div>
      </div>
    </div>
  );
};

export default OrganizationPage;

"use client";
import React, { useEffect, useState } from "react";

import { formatDateUtil, formatTime } from "@/app/ui/reusableFunctions/Utils";
import CustomButton from "@/app/ui/reusableComponents/CustomButton";
import Link from "next/link";
import { useContextApi } from "@/app/context/contexts";
import AddOrganization from "./AddOrganization";

const OrganizationPage = () => {
  const { organizations } = useContextApi();
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="mt-[20px]">
      <CustomButton
        name={"Add Organization"}
        onClick={() => setOpenModal(true)}
        className={
          "bg-[#995224] text-white mb-2 p-[5px] rounded-md w-[250px] h-[40px]"
        }
      />
      <div className="flex gap-2 flex-wrap">
        {organizations.length > 0 &&
          organizations.map((organization) => (
            <Link
              href={`organizations/${organization._id}`}
              key={organization.id}
              className="border w-[320px] bg-[white] cursor-pointer rounded-md flex flex-col justify-center p-[25px]  h-[230px]"
            >
              <p>Organization</p>
              <p className="font-[800] text-[18px]">
                {organization.organization_name.toLocaleUpperCase()}
              </p>

              <div className="flex justify-between mt-2">
                <div>
                  <p>Date created</p>
                  <p className="font-[800]">
                    {formatDateUtil(organization.created_at)}
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
            </Link>
          ))}
        <div
          className="border w-[320px] bg-white cursor-pointer rounded-md flex flex-col items-center justify-center h-[230px]"
          onClick={() => setOpenModal(true)}
        >
          <p>+</p>
          <p>Add Organization</p>
        </div>
      </div>
      <AddOrganization
        open={openModal}
        handleClose={() => setOpenModal(false)}
      />
    </div>
  );
};

export default OrganizationPage;

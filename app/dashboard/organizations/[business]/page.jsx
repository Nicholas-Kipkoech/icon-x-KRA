"use client";

import CustomButton from "@/app/ui/reusableComponents/CustomButton";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { formatDateUtil, formatTime } from "@/app/ui/reusableFunctions/Utils";
import { useContextApi } from "@/app/context/contexts";
import AddBusiness from "./AddBusiness";

const BusinessPage = ({ params: { business: organizationID } }) => {
  const [businesses, setBusinesses] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const { getOrgById } = useContextApi();

  useEffect(() => {
    const fetchOrganization = async (id) => {
      const data = await getOrgById(id);
      setBusinesses(data);
    };
    if (organizationID) {
      fetchOrganization(organizationID);
    }
  }, [organizationID, getOrgById]);

  return (
    <div className="mt-[20px]">
      <CustomButton
        name={"Add Business"}
        onClick={() => setOpenModal(true)}
        className={
          "bg-[#995224] text-white mb-2 p-[5px] rounded-md w-[250px] h-[40px]"
        }
      />
      <div className="flex gap-2 flex-wrap">
        {businesses.length > 0 &&
          businesses.map((business) => (
            <Link
              href=""
              key={business._id}
              className="border w-[320px] bg-[white] cursor-pointer rounded-md flex flex-col justify-center p-[25px]  h-[230px]"
            >
              <p className="font-[800] text-[14px]">PIN: {business.pin}</p>
              <p className="font-[800] text-[18px]">
                {business.businessName.toLocaleUpperCase()}
              </p>

              <div className="flex justify-between mt-2">
                <div>
                  <p>Date created</p>
                  <p className="font-[800]">
                    {formatDateUtil(business.created_at)}
                  </p>
                </div>
                <div>
                  <p>Time created</p>
                  <p className="font-[800]">
                    {formatTime(business.created_at)}
                  </p>
                </div>
              </div>
              <div className="flex justify-between mt-2">
                <div>
                  <p>Type</p>
                  <p className="font-[800]">{business.businessType}</p>
                </div>
              </div>
            </Link>
          ))}
        <div className="border w-[320px] bg-white cursor-pointer rounded-md flex flex-col items-center justify-center h-[230px]">
          <p>+</p>
          <p>Add Business</p>
        </div>
      </div>
      <AddBusiness open={openModal} handleClose={() => setOpenModal(false)} />
    </div>
  );
};

export default BusinessPage;

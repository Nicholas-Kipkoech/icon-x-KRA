"use client";

import CustomButton from "@/app/ui/reusableComponents/CustomButton";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { formatDateUtil, formatTime } from "@/app/ui/reusableFunctions/Utils";
import { useContextApi } from "@/app/context/contexts";
import AddBusiness from "./AddBusiness";
import { useRouter } from "next/navigation";
import { Spin } from "antd";

const BusinessPage = ({ params: { business: organizationID } }) => {
  const [businesses, setBusinesses] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const { getOrgById } = useContextApi();

  const fetchOrganization = async (id) => {
    setLoading(true);
    const data = await getOrgById(id);
    setBusinesses(data);
    setLoading(false);
  };
  useEffect(() => {
    if (organizationID) {
      fetchOrganization(organizationID);
    }
  }, [organizationID, getOrgById]);

  const handleCloseModal = () => {
    setOpenModal(false);
    fetchOrganization(organizationID);
  };
  const router = useRouter();
  return (
    <div className="mt-[20px]">
      <CustomButton
        name={"Back"}
        onClick={() => router.back()}
        className={
          "bg-[#132538] text-white mb-2 p-[5px] mr-3 rounded-md w-[250px] h-[40px]"
        }
      />
      <CustomButton
        name={"Add Business"}
        onClick={() => setOpenModal(true)}
        className={
          "bg-[#995224] text-white mb-2 p-[5px] rounded-md w-[250px] h-[40px]"
        }
      />
      <div className="flex gap-2 flex-wrap">
        {loading ? (
          <div className="border w-[320px] bg-[white] cursor-pointer rounded-md flex flex-col justify-center p-[25px]  h-[230px]">
            <Spin spinning={loading} />
            <p>Loading business...</p>
          </div>
        ) : (
          businesses.length > 0 &&
          businesses.map((business) => (
            <Link
              href={`${organizationID}/${business._id}`}
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
          ))
        )}

        <div className="border w-[320px] bg-white cursor-pointer rounded-md flex flex-col items-center justify-center h-[230px]">
          <p>+</p>
          <p>Add Business</p>
        </div>
      </div>
      <AddBusiness
        open={openModal}
        handleClose={handleCloseModal}
        organizationID={organizationID}
      />
    </div>
  );
};

export default BusinessPage;

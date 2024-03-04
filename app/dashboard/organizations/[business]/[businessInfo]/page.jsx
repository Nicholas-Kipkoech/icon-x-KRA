"use client";
import AddTransactionsPage from "@/app/dashboard/etims-management/page";
import ApiTesting from "@/app/dashboard/testing/page";
import React, { useState } from "react";

const BusinessInfoPage = ({ params: { businessInfo: businessId } }) => {
  const [showTesting, setShowTesting] = useState(true);
  const [showSale, setShowSale] = useState(false);

  const handleShowTesting = () => {
    setShowTesting((prev) => !prev);
    setShowSale(false);
  };
  const handleShowSale = () => {
    setShowSale((prev) => !prev);
    setShowTesting(false);
  };

  return (
    <>
      <div className="flex justify-center gap-10   items-center">
        <div
          className={`border h-[50px] border-black ${
            showTesting ? "bg-[#cb7529]" : "bg-[#094b6a]"
          } cursor-pointer text-white rounded-md justify-center items-center flex w-[400px]`}
          onClick={handleShowTesting}
        >
          API TESTING
        </div>

        <div
          className={`border h-[50px] border-black  ${
            showSale ? "bg-[#cb7529]" : "bg-[#094b6a]"
          } cursor-pointer text-white rounded-md justify-center items-center flex w-[400px]`}
          onClick={handleShowSale}
        >
          SAVE SALE TRANSACTIONS
        </div>
      </div>
      {showTesting && <ApiTesting businessId={businessId} />}
      {showSale && <AddTransactionsPage businessId={businessId} />}
    </>
  );
};

export default BusinessInfoPage;

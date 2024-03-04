import ApiTesting from "@/app/dashboard/testing/page";
import React from "react";

const BusinessInfoPage = ({ params: { businessInfo: businessId } }) => {
  return <ApiTesting businessId={businessId} />;
};

export default BusinessInfoPage;

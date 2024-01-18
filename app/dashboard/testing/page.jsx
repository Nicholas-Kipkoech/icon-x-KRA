"use client";
import CustomButton from "@/app/ui/reusableComponents/CustomButton";
import CustomInput from "@/app/ui/reusableComponents/CustomInput";
import React, { useState } from "react";
import axios from "axios";
import { corsMiddleware } from "@/app/lib/middleware";
import {
  fetchBranchLists,
  fetchCustomerInfo,
  initializeDevice,
  lookupItemClassFunc,
  lookupListCodeFunc,
} from "@/app/services/etimsServices";
import { Spin } from "antd";

import { formatDateToCustomFormat } from "@/app/ui/reusableFunctions/Utils";

const CustomTestButton = ({ number, name, onClick }) => {
  return (
    <div
      className="h-[50px] bg-[#cb852a] gap-8 text-white flex justify-center items-center text-[20px] rounded-md cursor-pointer"
      onClick={onClick}
    >
      <p className="bg-[black] text-white rounded-[50%] h-[30px] w-[30px] flex justify-center items-center">
        {number}
      </p>
      <p>{name}</p>
    </div>
  );
};

const CustomSubmitBtn = ({ onClick, submitting }) => {
  return (
    <CustomButton
      name={submitting ? "Submitting Info.." : "Submit to ETIMS"}
      onClick={onClick}
      className={
        "mt-5 border h-[50px] w-[100%] bg-[#7b7b95] rounded-md text-white"
      }
    />
  );
};

const CustomResponse = ({ response, submitting }) => {
  return (
    <div className="flex justify-center items-center p-5">
      {response ? (
        <div className="text-red">
          <p>Result Code: {response.resultCd}</p>
          <p>Result Message: {response.resultMsg}</p>
          <p>Result Date: {response.resultDt}</p>
        </div>
      ) : (
        <Spin spinning={submitting} />
      )}
    </div>
  );
};

const KRA_URL = "https://etims-api-sbx.kra.go.ke/etims-api";

const cmcKey = "DCB937400D344917A7E194BA8FA8CFEE61CD3DE0648D433CBFDC";
const tin = "P000597676Q";
const bhfId = "00";

const ApiTesting = () => {
  //payload states here
  const [response, setResponse] = useState({});
  const [submitting, setSubmitting] = useState(false);
  // 1: OSCU INITIALIZATION
  const [pin, setPin] = useState("");
  const [branchId, setBranchID] = useState("");
  const [devNo, setDevNo] = useState("");

  //2 : LOOK UP LIST OF CODE
  const [lastReqDt1, setLastReqDt1] = useState("");
  //3 : LOOK UP ITEM CLASSIFICATION
  const [lastReqDt2, setLastReqDt2] = useState("");
  //4 : GET CUSTOMER INFOMATION
  const [customerPin, setCustomerPin] = useState("");
  //5: LOOK UP BRANCH LIST
  const [lastReqDt3, setLastReqDt3] = useState("");

  const [hide1, setHide1] = useState(false);
  const [hide2, setHide2] = useState(false);
  const [hide3, setHide3] = useState(false);
  const [hide4, setHide4] = useState(false);
  const [hide5, setHide5] = useState(false);
  const [hide6, setHide6] = useState(false);
  const [hide7, setHide7] = useState(false);
  const [hide8, setHide8] = useState(false);
  const [hide9, setHide9] = useState(false);

  const initDevice = async () => {
    try {
      setSubmitting(true);
      let formData = new FormData();
      formData.append("tin", pin);
      formData.append("bhfId", branchId);
      formData.append("dvcSrlNo", devNo);
      const data = await initializeDevice(formData);
      setResponse(data);
      setSubmitting(false);
    } catch (error) {
      setResponse(error);
      setSubmitting(false);
    }
  };

  const lookupListCode = async () => {
    setSubmitting(true);
    try {
      const data = await lookupListCodeFunc({
        lastReqDt: formatDateToCustomFormat(lastReqDt1),
        cmcKey: cmcKey,
        tin: tin,
        bhfId: bhfId,
      });
      setResponse(data);
      setSubmitting(false);
    } catch (error) {
      setResponse({
        resultCd: 500,
        resultDt: formatDateToCustomFormat(Date.now),
        resultMsg: "Server error",
      });
    }
  };

  const lookupItemClass = async () => {
    setSubmitting(true);
    try {
      const data = await lookupItemClassFunc({
        lastReqDt: formatDateToCustomFormat(lastReqDt2),
        cmcKey: cmcKey,
        tin: tin,
        bhfId: bhfId,
      });
      console.log(data);
      setResponse(data.response);
      setSubmitting(false);
    } catch (error) {
      setResponse({
        resultCd: 500,
        resultDt: formatDateToCustomFormat(Date.now),
        resultMsg: "Server error",
      });
    }
  };

  const getCustomerInfo = async () => {
    try {
      setSubmitting(true);
      const data = await fetchCustomerInfo({
        custmTin: customerPin,
        cmcKey: cmcKey,
        tin: tin,
        bhfId: bhfId,
      });
      setResponse(data.response);
      setSubmitting(false);
    } catch (error) {
      setResponse({
        resultCd: 500,
        resultDt: formatDateToCustomFormat(Date.now),
        resultMsg: "Server error",
      });
      setSubmitting(false);
    }
  };

  const getBranchList = async () => {
    setSubmitting(true);
    try {
      const data = await fetchBranchLists({
        lastReqDt: formatDateToCustomFormat(lastReqDt3),
        cmcKey: cmcKey,
        tin: tin,
        bhfId: bhfId,
      });
      setResponse(data.response);
      setSubmitting(false);
    } catch (error) {
      setResponse({
        resultCd: 500,
        resultDt: formatDateToCustomFormat(Date.now),
        resultMsg: "Server error",
      });
    }
  };

  return (
    <div className="mt-5">
      <div className="flex">
        <div className="w-[50%]">
          <CustomTestButton
            number={1}
            name={"OSCU INITIALIZATION"}
            onClick={() => setHide1((prev) => !prev)}
          />
          {hide1 && (
            <>
              <div className="">
                <CustomInput
                  name={"KRA PIN NUMBER"}
                  required
                  value={pin}
                  className={"h-[50px] w-auto border p-2"}
                  onchange={(e) => setPin(e.target.value)}
                />
                <CustomInput
                  name={"Branch ID"}
                  required
                  value={branchId}
                  className={"h-[50px] border p-2"}
                  onchange={(e) => setBranchID(e.target.value)}
                />
                <CustomInput
                  name={"Device Serial Number"}
                  required
                  value={devNo}
                  className={"h-[50px] border p-2"}
                  onchange={(e) => setDevNo(e.target.value)}
                />
              </div>
              <CustomSubmitBtn onClick={initDevice} submitting={submitting} />
            </>
          )}
        </div>
        {hide1 && (
          <CustomResponse response={response} submitting={submitting} />
        )}
      </div>
      <div className="flex">
        <div className="w-[50%] mt-2">
          <CustomTestButton
            number={2}
            name={"LOOK UP LIST OF CODE"}
            onClick={() => setHide2((prev) => !prev)}
          />
          {hide2 && (
            <>
              <div className="">
                <CustomInput
                  name={"Last Request Date"}
                  required
                  value={lastReqDt1}
                  onchange={(e) => setLastReqDt1(e.target.value)}
                  type={"date"}
                  className={"h-[50px] w-auto border p-2"}
                />
              </div>
              <CustomSubmitBtn
                onClick={lookupListCode}
                submitting={submitting}
              />
            </>
          )}
        </div>
        {hide2 && (
          <CustomResponse response={response} submitting={submitting} />
        )}
      </div>
      <div className="flex">
        <div className="w-[50%] mt-2">
          <CustomTestButton
            number={3}
            name={"LOOK UP ITEM CLASSIFICATION"}
            onClick={() => setHide3((prev) => !prev)}
          />
          {hide3 && (
            <>
              <div className="">
                <CustomInput
                  name={"Last Request Date"}
                  required
                  value={lastReqDt2}
                  onchange={(e) => setLastReqDt2(e.target.value)}
                  type={"date"}
                  className={"h-[50px] w-auto border p-2"}
                />
              </div>
              <CustomSubmitBtn
                onClick={lookupItemClass}
                submitting={submitting}
              />
            </>
          )}
        </div>
        {hide3 && (
          <CustomResponse response={response} submitting={submitting} />
        )}
      </div>
      <div className="flex">
        <div className="w-[50%] mt-2">
          <CustomTestButton
            number={4}
            name={"GET CUSTOMER INFOMATION"}
            onClick={() => setHide4((prev) => !prev)}
          />
          {hide4 && (
            <>
              <div className="">
                <CustomInput
                  name={"Customer PIN Number"}
                  required
                  value={customerPin}
                  onchange={(e) => setCustomerPin(e.target.value)}
                  className={"h-[50px] w-auto border p-2"}
                />
              </div>
              <CustomSubmitBtn
                onClick={getCustomerInfo}
                submitting={submitting}
              />
            </>
          )}
        </div>
        {hide4 && (
          <CustomResponse response={response} submitting={submitting} />
        )}
      </div>
      <div className="flex">
        <div className="w-[50%] mt-2">
          <CustomTestButton
            number={5}
            name={"LOOK UP BRANCH LIST"}
            onClick={() => setHide5((prev) => !prev)}
          />
          {hide5 && (
            <>
              <div className="">
                <CustomInput
                  name={"Last Request Date"}
                  required
                  value={lastReqDt3}
                  onchange={(e) => setLastReqDt3(e.target.value)}
                  type={"date"}
                  className={"h-[50px] w-auto border p-2"}
                />
              </div>
              <CustomSubmitBtn
                onClick={getBranchList}
                submitting={submitting}
              />
            </>
          )}
        </div>
        {hide5 && (
          <CustomResponse response={response} submitting={submitting} />
        )}
      </div>
      <div className="flex">
        <div className="w-[50%] mt-2">
          <CustomTestButton
            number={6}
            name={"LOOK UP NOTICES LIST"}
            onClick={() => setHide6((prev) => !prev)}
          />
          {hide6 && (
            <>
              <div className="">
                <CustomInput
                  name={"Last Request Date"}
                  required
                  type={"date"}
                  className={"h-[50px] w-auto border p-2"}
                />
              </div>
              <CustomSubmitBtn />
            </>
          )}
        </div>
        {hide6 && (
          <div className="flex justify-center items-center">
            Response Here....
          </div>
        )}
      </div>
      <div className="flex">
        <div className="w-[50%] mt-2">
          <CustomTestButton
            number={7}
            name={"SAVE CUSTOMER TO BRANCH"}
            onClick={() => setHide7((prev) => !prev)}
          />
          {hide7 && (
            <>
              <div className="">
                <CustomInput
                  name={"Last Request Date"}
                  required
                  type={"date"}
                  className={"h-[50px] w-auto border p-2"}
                />
              </div>
              <CustomSubmitBtn />
            </>
          )}
        </div>
        {hide7 && (
          <div className="flex justify-center items-center">
            Response Here....
          </div>
        )}
      </div>
    </div>
  );
};

export default ApiTesting;

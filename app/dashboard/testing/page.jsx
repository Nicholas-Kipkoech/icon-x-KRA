"use client";
import CustomButton from "@/app/ui/reusableComponents/CustomButton";
import CustomInput from "@/app/ui/reusableComponents/CustomInput";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { corsMiddleware } from "@/app/lib/middleware";
import {
  fetchBranchLists,
  fetchCustomerInfo,
  fetchImportedList,
  fetchNoticeLists,
  initializeDevice,
  insertStockIO,
  lookupItemClassFunc,
  lookupListCodeFunc,
  saveBranchInsurance,
  saveCustomerToBranch,
  saveItemCompositionReq,
  saveItemReq,
  savePurchaseInfoReq,
  saveStockMasterReq,
  saveUserToBranch,
  updateImportItemReq,
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

const CustomResponse = ({ response }) => {
  return (
    <div className="flex justify-center items-center p-5 ">
      {response && (
        <div className="text-[#ef3a6d]">
          <p>Result Code: {response.resultCd}</p>
          <p>Result Message: {response.resultMsg}</p>
          <p>Result Date: {response.resultDt}</p>
        </div>
      )}
    </div>
  );
};

// const cmcKey = "DCB937400D344917A7E194BA8FA8CFEE61CD3DE0648D433CBFDC";
// const tin = "P000597676Q";
// const bhfId = "00";

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
  //5: LOOK UP NOTICES LIST
  const [lastReqDt3, setLastReqDt3] = useState("");
  //6: LOOK UP BRANCH LIST
  const [lastReqDt4, setLastReqDt4] = useState("");
  //7: SAVE CUSTOMER TO BRANCH
  const [custNo, setCustNo] = useState("");
  const [custTin, setCustTin] = useState("");
  const [custNm, setCustNm] = useState("");
  const [regrId, setRegrId] = useState("");
  const [regrNm, setRegrNm] = useState("");
  const [modrId, setModrId] = useState("");
  const [modrNm, setModrNm] = useState("");
  //8: SAVE BRANCH USER ACCOUNT
  const [userId, setUserId] = useState("");
  const [userNm, setUserNm] = useState("");
  const [pwd, setPwd] = useState("");
  const [regrIdBr, setRegIdBr] = useState("");
  const [regrNmBr, setRegrNmBr] = useState("");
  const [modrIdBr, setModrIdBr] = useState("");
  const [modrNmBr, setModrNmBr] = useState("");
  //9: SAVE BRANCH INSURANCES
  const [isrccCd, setIsrccCd] = useState("");
  const [isrccNm, setIsrccNm] = useState("");
  const [isrcRt, setIsrcRt] = useState("");
  const [insRegrId, setInsRegrId] = useState("");
  const [insRegrNm, setInsRegrNm] = useState("");
  const [insModrId, setInsModrId] = useState("");
  const [insModrNm, setInsModrNm] = useState("");
  //:10 SAVE ITEM
  const [itemClsCd, setItemClsCd] = useState("");
  const [itemCd, setItemCd] = useState("");
  const [itemNm, setItemNm] = useState("");
  const [itemRegrId, setItemRegrId] = useState("");
  const [itemRegrNm, setItemRegrNm] = useState("");
  const [itemModrId, setItemModrId] = useState("");
  const [itemModrNm, setItemModrNm] = useState("");
  const [dftPrc, setDftPrc] = useState("");
  //11 : SAVE ITEM COMPOSITION
  const [itemCompCd, setItemCompCd] = useState("");
  const [cpstItemCd, setCpstItemCd] = useState("");
  const [cpstQty, setCpstQty] = useState("");
  const [itemCompRegrId, setItemCompRegrId] = useState("");
  const [itemCompRegrNm, setItemCompRegrNm] = useState("");
  //12: LOOK UP IMPORTED ITEM LIST
  const [lastReqDt5, setLastReqDt5] = useState("");
  //13: UPDATE IMPORTED ITEMS
  const [taskCd, setTaskCd] = useState("");
  const [dclDe, setDclDe] = useState("");
  const [hsCd, setHsCd] = useState("");
  const [itemImpClsCd, setItemImpClsCode] = useState("");
  const [itemImpCd, setItemImpCd] = useState("");
  const [impModrId, setImpModrId] = useState("");
  const [impModrNm, setImpModrNm] = useState("");
  //14: LOOK UP PURCHASES-SALES LIST
  const [lastReqDt6, setLastReqDt6] = useState("");
  //15: SAVE PURCHASES INFORMATION
  const [invcNo, setInvcNo] = useState("");
  const [orgInvcNo, setOrgInvNo] = useState("");
  const [pchsDt, setPchsDt] = useState("");
  const [PurRegrId, setPurRegrId] = useState("");
  const [PurRegrNm, setPurRegrNm] = useState("");
  const [PurModId, setPurModId] = useState("");
  const [PurModNm, setPurModNm] = useState("");
  const [PurItemClsCd, setPurItemClsCd] = useState("");
  const [PurItemNm, setPurItemNm] = useState("");
  const [qty, setQty] = useState("");
  const [prc, setPrc] = useState("");
  //16: SAVE STOCK-MASTER INFORMATION
  const [sItemCd, setSitemCd] = useState("");
  const [rsdQty, setRsdQty] = useState("");
  const [sRegrId, setSRegrId] = useState("");
  const [sRegrNm, setSRegrNm] = useState("");
  const [sModrId, setSModrId] = useState("");
  const [sModrNm, setSModrNm] = useState("");
  //17: LOOK UP STOCK MOVEMENT
  const [lastReqDt7, setLastReqDt7] = useState("");
  //18: SAVE STOCK IN/OUT
  const [sarNo, setSarNo] = useState("");
  const [orgSarNo, setOrgSarNo] = useState("");
  const [ocrnDt, setOcrnDt] = useState("");
  const [IOregrId, setIORegrId] = useState("");
  const [IOregrNm, setIORegrNm] = useState("");
  const [IOmodId, setIOmodrId] = useState("");
  const [IOmodNm, setIOmodrNm] = useState("");
  const [IOitemClsCd, setIOitemclsCd] = useState("");
  const [IOitemNm, setIOitemNm] = useState("");
  const [IOqty, setIOqty] = useState("");
  const [IOprc, setIOprc] = useState("");
  //19 : Look Up Product List
  const [lastReqDt8, setLastReqDt8] = useState("");
  const [hide1, setHide1] = useState(false);
  const [hide2, setHide2] = useState(false);
  const [hide3, setHide3] = useState(false);
  const [hide4, setHide4] = useState(false);
  const [hide5, setHide5] = useState(false);
  const [hide6, setHide6] = useState(false);
  const [hide7, setHide7] = useState(false);
  const [hide8, setHide8] = useState(false);
  const [hide9, setHide9] = useState(false);
  const [hide10, setHide10] = useState(false);
  const [hide11, setHide11] = useState(false);
  const [hide12, setHide12] = useState(false);
  const [hide13, setHide13] = useState(false);
  const [hide14, setHide14] = useState(false);
  const [hide15, setHide15] = useState(false);
  const [hide16, setHide16] = useState(false);
  const [hide17, setHide17] = useState(false);
  const [hide18, setHide18] = useState(false);
  const [hide19, setHide19] = useState(false);

  //1
  const initDevice = async () => {
    try {
      setSubmitting(true);
      const apiResponse = await initializeDevice({
        tin: pin,
        bhfId: branchId,
        dvcSrlNo: devNo,
      });
      localStorage.setItem("cmcKey", apiResponse.data.info.cmcKey);
      localStorage.setItem("bhfId", apiResponse.data.info.bhfId);
      localStorage.setItem("tin", apiResponse.data.info.tin);
      setResponse(apiResponse);
      setSubmitting(false);
    } catch (error) {
      setResponse(error);
      setSubmitting(false);
    }
  };

  const cmcKey = localStorage.getItem("cmcKey");
  const tin = localStorage.getItem("tin");
  const bhfId = localStorage.getItem("bhfId");

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
  //3
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
  //4
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
  //5
  const getBranchList = async () => {
    setSubmitting(true);
    try {
      const data = await fetchBranchLists({
        lastReqDt: formatDateToCustomFormat(lastReqDt4),
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
  //6
  const getNoticeList = async () => {
    try {
      setSubmitting(true);
      const response = await fetchNoticeLists({
        lastReqDt: formatDateToCustomFormat(lastReqDt3),
        cmcKey: cmcKey,
        tin: tin,
        bhfId: bhfId,
      });
      setResponse(response.response);
      setSubmitting(false);
    } catch (error) {
      console.error(error);
      setSubmitting(false);
    }
  };
  //7
  const saveCustomerToBr = async () => {
    try {
      setSubmitting(true);
      const response = await saveCustomerToBranch({
        custNo: custNo,
        custTin: custTin,
        custNm: custNm,
        adrs: null,
        telNo: null,
        email: null,
        faxNo: null,
        useYn: "Y",
        remark: null,
        regrId: regrId,
        regrNm: regrNm,
        modrId: modrId,
        modrNm: modrNm,
        cmcKey: cmcKey,
        tin: tin,
        bhfId: bhfId,
      });
      setResponse(response.response);
      setSubmitting(false);
    } catch (error) {
      console.error(error);
      setSubmitting(false);
    }
  };
  //8
  const saveUserToBr = async () => {
    try {
      setSubmitting(true);
      const response = await saveUserToBranch({
        userId: userId,
        userNm: userNm,
        pwd: pwd,
        adrs: null,
        cntc: null,
        authCd: null,
        remark: null,
        useYn: "Y",
        regrId: regrIdBr,
        regrNm: regrNmBr,
        modrId: modrIdBr,
        modrNm: modrNmBr,
        cmcKey: cmcKey,
        tin: tin,
        bhfId: bhfId,
      });
      setResponse(response.response);
      setSubmitting(false);
    } catch (error) {
      console.error(error);
      setSubmitting(false);
    }
  };
  //9
  const saveBhfInsurance = async () => {
    try {
      setSubmitting(true);
      const response = await saveBranchInsurance({
        isrccCd: isrccCd,
        isrccNm: isrccNm,
        isrcRt: isrcRt,
        useYn: "Y",
        regrId: insRegrId,
        regrNm: insRegrNm,
        modrId: insModrId,
        modrNm: insModrNm,
        cmcKey: cmcKey,
        tin: tin,
        bhfId: bhfId,
      });
      setResponse(response.response);
      setSubmitting(false);
    } catch (error) {
      console.error(error);
      setSubmitting(false);
    }
  };
  //10
  const saveItem = async () => {
    try {
      setSubmitting(true);
      const response = await saveItemReq({
        itemCd: itemCd,
        itemClsCd: itemClsCd,
        itemTyCd: "1",
        itemNm: itemNm,
        itemStdNm: null,
        orgnNatCd: "KE",
        pkgUnitCd: "NT",
        qtyUnitCd: "U",
        taxTyCd: "B",
        btchNo: null,
        bcd: null,
        dftPrc: dftPrc,
        grpPrcL1: 3500,
        grpPrcL2: 3500,
        grpPrcL3: 3500,
        grpPrcL4: 3500,
        grpPrcL5: null,
        addInfo: null,
        sftyQty: null,
        isrcAplcbYn: "N",
        useYn: "Y",
        regrId: itemRegrId,
        regrNm: itemRegrNm,
        modrId: itemModrId,
        modrNm: itemModrNm,
        cmcKey: cmcKey,
        tin: tin,
        bhfId: bhfId,
      });
      setResponse(response.response);
      setSubmitting(false);
    } catch (error) {
      console.error(error);
      setSubmitting(false);
    }
  };
  //11
  const saveItemComposition = async () => {
    try {
      setSubmitting(true);
      const response = await saveItemCompositionReq({
        itemCd: itemCompCd,
        cpstItemCd: cpstItemCd,
        cpstQty: cpstQty,
        regrId: itemCompRegrId,
        regrNm: itemCompRegrNm,
        cmcKey: cmcKey,
        tin: tin,
        bhfId: bhfId,
      });
      setResponse(response.response);
      setSubmitting(false);
    } catch (error) {
      console.error(error);
      setSubmitting(false);
    }
  };
  //12
  const lookUpImportedList = async () => {
    try {
      setSubmitting(true);
      const response = await fetchImportedList({
        lastReqDt: formatDateToCustomFormat(lastReqDt5),
        cmcKey: cmcKey,
        tin: tin,
        bhfId: bhfId,
      });
      setResponse(response.response);
      setSubmitting(false);
    } catch (error) {
      console.error(error);
      setSubmitting(false);
    }
  };
  //13
  const updateImportItem = async () => {
    try {
      setSubmitting(true);
      const response = await updateImportItemReq({
        taskCd: taskCd,
        dclDe: dclDe.replace(/-/g, ""),
        itemSeq: 1,
        hsCd: hsCd,
        itemClsCd: itemImpClsCd,
        itemCd: itemImpCd,
        imptItemSttsCd: "1",
        remark: null,
        modrId: impModrId,
        modrNm: impModrNm,
        cmcKey: cmcKey,
        tin: tin,
        bhfId: bhfId,
      });
      setResponse(response.response);
      setSubmitting(false);
    } catch (error) {
      console.error(error);
      setSubmitting(false);
    }
  };
  //14
  const lookupPurchaseList = async () => {
    try {
      setSubmitting(true);
      const response = await fetchImportedList({
        lastReqDt: formatDateToCustomFormat(lastReqDt6),
        cmcKey: cmcKey,
        tin: tin,
        bhfId: bhfId,
      });
      setResponse(response.response);
      setSubmitting(false);
    } catch (error) {
      console.error(error);
      setSubmitting(false);
    }
  };
  //15
  const savePurchaseInfo = async () => {
    try {
      setSubmitting(true);
      const response = await savePurchaseInfoReq({
        invcNo: invcNo,
        orgInvcNo: orgInvcNo,
        spplrTin: null,
        spplrBhfId: null,
        spplrNm: null,
        spplrInvcNo: null,
        regTyCd: "M",
        pchsTyCd: "N",
        rcptTyCd: "P",
        pmtTyCd: "01",
        pchsSttsCd: "02",
        cfmDt: null,
        pchsDt: pchsDt.replace(/-/g, ""),
        wrhsDt: "",
        cnclReqDt: "",
        cnclDt: "",
        rfdDt: "",
        totItemCnt: 1,
        taxblAmtA: 0,
        taxblAmtB: 10500,
        taxblAmtC: 0,
        taxblAmtD: 0,
        taxblAmtE: 0,
        taxRtA: 0,
        taxRtB: 18,
        taxRtC: 0,
        taxRtD: 0,
        taxRtE: 0,
        taxAmtA: 0,
        taxAmtB: 1890,
        taxAmtC: 0,
        taxAmtD: 0,
        taxAmtE: 0,
        totTaxblAmt: 10500,
        totTaxAmt: 1890,
        totAmt: 10500,
        remark: null,
        regrId: PurRegrId,
        regrNm: PurRegrNm,
        modrId: PurModId,
        modrNm: PurModNm,
        itemList: [
          {
            itemSeq: 1,
            itemCd: null,
            itemClsCd: PurItemClsCd,
            itemNm: PurItemNm,
            bcd: "",
            spplrItemClsCd: null,
            spplrItemCd: null,
            spplrItemNm: null,
            pkgUnitCd: "NT",
            pkg: 2,
            qtyUnitCd: "U",
            qty: qty,
            prc: prc,
            splyAmt: 0,
            dcRt: 0,
            dcAmt: 0,
            taxblAmt: 7000,
            taxTyCd: "B",
            taxAmt: 1260,
            totAmt: 7000,
            itemExprDt: null,
          },
        ],
        cmcKey: cmcKey,
        tin: tin,
        bhfId: bhfId,
      });
      setResponse(response.response);
      setSubmitting(false);
    } catch (error) {
      console.error(error);
      setSubmitting(false);
    }
  };
  //16
  const saveStockMaster = async () => {
    try {
      setSubmitting(true);
      const response = await saveStockMasterReq({
        itemCd: sItemCd,
        rsdQty: rsdQty,
        regrId: sRegrId,
        regrNm: sRegrNm,
        modrId: sModrId,
        modrNm: sModrNm,
        cmcKey: cmcKey,
        tin: tin,
        bhfId: bhfId,
      });
      setResponse(response.response);
      setSubmitting(false);
    } catch (error) {
      console.error(error);
      setSubmitting(false);
    }
  };
  //17
  const lookupStockMaster = async () => {
    try {
      setSubmitting(true);
      const response = await fetchImportedList({
        lastReqDt: formatDateToCustomFormat(lastReqDt7),
        cmcKey: cmcKey,
        tin: tin,
        bhfId: bhfId,
      });
      setResponse(response.response);
      setSubmitting(false);
    } catch (error) {
      console.error(error);
      setSubmitting(false);
    }
  };
  //18
  const saveStockIO = async () => {
    try {
      setSubmitting(true);
      const response = await insertStockIO({
        sarNo: sarNo,
        orgSarNo: orgSarNo,
        regTyCd: "M",
        custTin: "A123456789Z",
        custNm: null,
        custBhfId: null,
        sarTyCd: "11",
        ocrnDt: ocrnDt.replace(/-/g, ""),
        totItemCnt: 1,
        totTaxblAmt: 70000,
        totTaxAmt: 10677.96,
        totAmt: 70000,
        remark: null,
        regrId: IOregrId,
        regrNm: IOregrNm,
        modrId: IOmodId,
        modrNm: IOmodNm,
        itemList: [
          {
            itemSeq: 1,
            itemCd: null,
            itemClsCd: IOitemClsCd,
            itemNm: IOitemNm,
            bcd: null,
            pkgUnitCd: "NT",
            pkg: 10,
            qtyUnitCd: "U",
            qty: IOqty,
            itemExprDt: null,
            prc: IOprc,
            splyAmt: 0,
            totDcAmt: 0,
            taxblAmt: 0,
            taxTyCd: "B",
            taxAmt: 0,
            totAmt: 0,
          },
        ],
        cmcKey: cmcKey,
        tin: tin,
        bhfId: bhfId,
      });
      setResponse(response.response);
      setSubmitting(false);
    } catch (error) {
      console.error(error);
      setSubmitting(false);
    }
  };
  //19
  const lookupProductList = async () => {
    try {
      setSubmitting(true);
      const response = await fetchImportedList({
        lastReqDt: formatDateToCustomFormat(lastReqDt8),
        cmcKey: cmcKey,
        tin: tin,
        bhfId: bhfId,
      });
      setResponse(response.response);
      setSubmitting(false);
    } catch (error) {
      console.error(error);
      setSubmitting(false);
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
        {hide1 && <CustomResponse response={response} />}
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
        {hide2 && <CustomResponse response={response} />}
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
        {hide3 && <CustomResponse response={response} />}
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
        {hide4 && <CustomResponse response={response} />}
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
                  value={lastReqDt4}
                  onchange={(e) => setLastReqDt4(e.target.value)}
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
        {hide5 && <CustomResponse response={response} />}
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
                  value={lastReqDt3}
                  onchange={(e) => setLastReqDt3(e.target.value)}
                  type={"date"}
                  className={"h-[50px] w-auto border p-2"}
                />
              </div>
              <CustomSubmitBtn
                onClick={getNoticeList}
                submitting={submitting}
              />
            </>
          )}
        </div>
        {hide6 && <CustomResponse response={response} />}
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
                  name={"Customer Number"}
                  required
                  value={custNo}
                  onchange={(e) => setCustNo(e.target.value)}
                  className={"h-[50px] w-auto border p-2"}
                />{" "}
                <CustomInput
                  name={"Customer PIN"}
                  value={custTin}
                  onchange={(e) => setCustTin(e.target.value)}
                  required
                  className={"h-[50px] w-auto border p-2"}
                />{" "}
                <CustomInput
                  name={"Customer Name"}
                  value={custNm}
                  onchange={(e) => setCustNm(e.target.value)}
                  required
                  className={"h-[50px] w-auto border p-2"}
                />{" "}
                <CustomInput
                  name={"Registration ID"}
                  value={regrId}
                  onchange={(e) => setRegrId(e.target.value)}
                  required
                  className={"h-[50px] w-auto border p-2"}
                />{" "}
                <CustomInput
                  name={"Registration Name"}
                  value={regrNm}
                  onchange={(e) => setRegrNm(e.target.value)}
                  required
                  className={"h-[50px] w-auto border p-2"}
                />
                <CustomInput
                  name={"Modifier ID"}
                  value={modrId}
                  onchange={(e) => setModrId(e.target.value)}
                  required
                  className={"h-[50px] w-auto border p-2"}
                />
                <CustomInput
                  name={"Modifier Name"}
                  value={modrNm}
                  onchange={(e) => setModrNm(e.target.value)}
                  required
                  className={"h-[50px] w-auto border p-2"}
                />
              </div>
              <CustomSubmitBtn
                submitting={submitting}
                onClick={saveCustomerToBr}
              />
            </>
          )}
        </div>
        {hide7 && <CustomResponse response={response} />}
      </div>
      <div className="flex">
        <div className="w-[50%] mt-2">
          <CustomTestButton
            number={8}
            name={"SAVE BRANCH USER ACCOUNT"}
            onClick={() => setHide8((prev) => !prev)}
          />
          {hide8 && (
            <>
              <div className="">
                <CustomInput
                  name={"User ID"}
                  required
                  value={userId}
                  onchange={(e) => setUserId(e.target.value)}
                  className={"h-[50px] w-auto border p-2"}
                />
                <CustomInput
                  name={"User Name"}
                  value={userNm}
                  onchange={(e) => setUserNm(e.target.value)}
                  required
                  className={"h-[50px] w-auto border p-2"}
                />
                <CustomInput
                  name={"Password"}
                  value={pwd}
                  onchange={(e) => setPwd(e.target.value)}
                  required
                  className={"h-[50px] w-auto border p-2"}
                />
                <CustomInput
                  name={"Registration ID"}
                  value={regrIdBr}
                  onchange={(e) => setRegIdBr(e.target.value)}
                  required
                  className={"h-[50px] w-auto border p-2"}
                />{" "}
                <CustomInput
                  name={"Registration Name"}
                  value={regrNmBr}
                  onchange={(e) => setRegrNmBr(e.target.value)}
                  required
                  className={"h-[50px] w-auto border p-2"}
                />
                <CustomInput
                  name={"Modifier ID"}
                  value={modrIdBr}
                  onchange={(e) => setModrIdBr(e.target.value)}
                  required
                  className={"h-[50px] w-auto border p-2"}
                />
                <CustomInput
                  name={"Modifier Name"}
                  value={modrNmBr}
                  onchange={(e) => setModrNmBr(e.target.value)}
                  required
                  className={"h-[50px] w-auto border p-2"}
                />
              </div>
              <CustomSubmitBtn submitting={submitting} onClick={saveUserToBr} />
            </>
          )}
        </div>
        {hide8 && <CustomResponse response={response} />}
      </div>
      <div className="flex">
        <div className="w-[50%] mt-2">
          <CustomTestButton
            number={9}
            name={"SAVE BRANCH INSURANCES"}
            onClick={() => setHide9((prev) => !prev)}
          />
          {hide9 && (
            <>
              <div className="">
                <CustomInput
                  name={"Insurance Code"}
                  required
                  value={isrccCd}
                  onchange={(e) => setIsrccCd(e.target.value)}
                  className={"h-[50px] w-auto border p-2"}
                />
                <CustomInput
                  name={"Insurance Name"}
                  value={isrccNm}
                  onchange={(e) => setIsrccNm(e.target.value)}
                  required
                  className={"h-[50px] w-auto border p-2"}
                />
                <CustomInput
                  name={"Premium Rate"}
                  value={isrcRt}
                  onchange={(e) => setIsrcRt(e.target.value)}
                  required
                  type={"number"}
                  className={"h-[50px] w-auto border p-2"}
                />
                <CustomInput
                  name={"Registration ID"}
                  required
                  value={insRegrId}
                  onchange={(e) => setInsRegrId(e.target.value)}
                  className={"h-[50px] w-auto border p-2"}
                />
                <CustomInput
                  name={"Registration Name"}
                  value={insRegrNm}
                  onchange={(e) => setInsRegrNm(e.target.value)}
                  required
                  className={"h-[50px] w-auto border p-2"}
                />
                <CustomInput
                  name={"Modifier ID"}
                  value={insModrId}
                  onchange={(e) => setInsModrId(e.target.value)}
                  required
                  className={"h-[50px] w-auto border p-2"}
                />
                <CustomInput
                  name={"Modifier Name"}
                  value={insModrNm}
                  onchange={(e) => setInsModrNm(e.target.value)}
                  required
                  className={"h-[50px] w-auto border p-2"}
                />{" "}
              </div>
              <CustomSubmitBtn
                submitting={submitting}
                onClick={saveBhfInsurance}
              />
            </>
          )}
        </div>
        {hide9 && <CustomResponse response={response} />}
      </div>
      <div className="flex">
        <div className="w-[50%] mt-2">
          <CustomTestButton
            number={10}
            name={"SAVE ITEM"}
            onClick={() => setHide10((prev) => !prev)}
          />
          {hide10 && (
            <>
              <div className="">
                <CustomInput
                  name={"Item Code"}
                  required
                  value={itemClsCd}
                  onchange={(e) => setItemClsCd(e.target.value)}
                  className={"h-[50px] w-auto border p-2"}
                />
                <CustomInput
                  name={"Item Classification Code"}
                  value={itemCd}
                  onchange={(e) => setItemCd(e.target.value)}
                  required
                  className={"h-[50px] w-auto border p-2"}
                />
                <CustomInput
                  name={"item Name"}
                  value={itemNm}
                  onchange={(e) => setItemNm(e.target.value)}
                  required
                  className={"h-[50px] w-auto border p-2"}
                />
                <CustomInput
                  name={"Defaul Unit Price"}
                  required
                  value={dftPrc}
                  type={"number"}
                  onchange={(e) => setDftPrc(e.target.value)}
                  className={"h-[50px] w-auto border p-2"}
                />
                <CustomInput
                  name={"Registration ID"}
                  required
                  value={itemRegrId}
                  onchange={(e) => setItemRegrId(e.target.value)}
                  className={"h-[50px] w-auto border p-2"}
                />{" "}
                <CustomInput
                  name={"Registration Name"}
                  value={itemRegrNm}
                  onchange={(e) => setItemRegrNm(e.target.value)}
                  required
                  className={"h-[50px] w-auto border p-2"}
                />{" "}
                <CustomInput
                  name={"Modifier ID"}
                  value={itemModrId}
                  onchange={(e) => setItemModrId(e.target.value)}
                  required
                  className={"h-[50px] w-auto border p-2"}
                />{" "}
                <CustomInput
                  name={"Modifier Name"}
                  value={itemModrNm}
                  onchange={(e) => setItemModrNm(e.target.value)}
                  required
                  className={"h-[50px] w-auto border p-2"}
                />{" "}
              </div>
              <CustomSubmitBtn submitting={submitting} onClick={saveItem} />
            </>
          )}
        </div>
        {hide10 && <CustomResponse response={response} />}
      </div>
      <div className="flex">
        <div className="w-[50%] mt-2">
          <CustomTestButton
            number={11}
            name={"SAVE ITEM COMPOSITION"}
            onClick={() => setHide11((prev) => !prev)}
          />
          {hide11 && (
            <>
              <div className="">
                <CustomInput
                  name={"Item Code"}
                  value={itemCompCd}
                  onchange={(e) => setItemCompCd(e.target.value)}
                  required
                  className={"h-[50px] w-auto border p-2"}
                />
                <CustomInput
                  name={"cpst Item Code"}
                  value={cpstItemCd}
                  onchange={(e) => setCpstItemCd(e.target.value)}
                  required
                  className={"h-[50px] w-auto border p-2"}
                />
                <CustomInput
                  name={"cpst Quantity"}
                  value={cpstQty}
                  type={"number"}
                  onchange={(e) => setCpstQty(e.target.value)}
                  required
                  className={"h-[50px] w-auto border p-2"}
                />
                <CustomInput
                  name={"Registration ID"}
                  value={itemCompRegrId}
                  onchange={(e) => setItemCompRegrId(e.target.value)}
                  required
                  className={"h-[50px] w-auto border p-2"}
                />
                <CustomInput
                  name={"Registration Name"}
                  value={itemCompRegrNm}
                  onchange={(e) => setItemCompRegrNm(e.target.value)}
                  required
                  className={"h-[50px] w-auto border p-2"}
                />
              </div>
              <CustomSubmitBtn
                submitting={submitting}
                onClick={saveItemComposition}
              />
            </>
          )}
        </div>
        {hide11 && <CustomResponse response={response} />}
      </div>
      <div className="flex">
        <div className="w-[50%] mt-2">
          <CustomTestButton
            number={12}
            name={"LOOK UP IMPORTED ITEM LIST"}
            onClick={() => setHide12((prev) => !prev)}
          />
          {hide12 && (
            <>
              <div className="">
                <CustomInput
                  name={"Last Request Date"}
                  required
                  value={lastReqDt5}
                  onchange={(e) => setLastReqDt5(e.target.value)}
                  type={"date"}
                  className={"h-[50px] w-auto border p-2"}
                />
              </div>
              <CustomSubmitBtn
                submitting={submitting}
                onClick={lookUpImportedList}
              />
            </>
          )}
        </div>
        {hide12 && <CustomResponse response={response} />}
      </div>
      <div className="flex">
        <div className="w-[50%] mt-2">
          <CustomTestButton
            number={13}
            name={"UPDATE IMPORTED ITEMS"}
            onClick={() => setHide13((prev) => !prev)}
          />
          {hide13 && (
            <>
              <div className="">
                <CustomInput
                  name={"Task Code"}
                  required
                  value={taskCd}
                  onchange={(e) => setTaskCd(e.target.value)}
                  className={"h-[50px] w-auto border p-2"}
                />
                <CustomInput
                  name={"Declaration Date"}
                  value={dclDe}
                  onchange={(e) => setDclDe(e.target.value)}
                  required
                  type={"date"}
                  className={"h-[50px] w-auto border p-2"}
                />

                <CustomInput
                  name={"HS Code"}
                  value={hsCd}
                  onchange={(e) => setHsCd(e.target.value)}
                  required
                  className={"h-[50px] w-auto border p-2"}
                />
                <CustomInput
                  name={"Item Classification Code"}
                  value={itemImpClsCd}
                  onchange={(e) => setItemImpClsCode(e.target.value)}
                  required
                  className={"h-[50px] w-auto border p-2"}
                />
                <CustomInput
                  name={"Item Code"}
                  value={itemImpCd}
                  onchange={(e) => setItemImpCd(e.target.value)}
                  required
                  className={"h-[50px] w-auto border p-2"}
                />

                <CustomInput
                  name={"Modifier ID"}
                  value={impModrId}
                  onchange={(e) => setImpModrId(e.target.value)}
                  required
                  className={"h-[50px] w-auto border p-2"}
                />
                <CustomInput
                  name={"Modifier Name"}
                  value={impModrNm}
                  onchange={(e) => setImpModrNm(e.target.value)}
                  required
                  className={"h-[50px] w-auto border p-2"}
                />
              </div>
              <CustomSubmitBtn
                submitting={submitting}
                onClick={updateImportItem}
              />
            </>
          )}
        </div>
        {hide13 && <CustomResponse response={response} />}
      </div>
      <div className="flex">
        <div className="w-[50%] mt-2">
          <CustomTestButton
            number={14}
            name={"LOOK UP PURCHASES-SALES LIST"}
            onClick={() => setHide14((prev) => !prev)}
          />
          {hide14 && (
            <>
              <div className="">
                <CustomInput
                  name={"Last Request Date"}
                  value={lastReqDt6}
                  type={"date"}
                  onchange={(e) => setLastReqDt6(e.target.value)}
                  required
                  className={"h-[50px] w-auto border p-2"}
                />
              </div>
              <CustomSubmitBtn
                submitting={submitting}
                onClick={lookupPurchaseList}
              />
            </>
          )}
        </div>
        {hide14 && <CustomResponse response={response} />}
      </div>
      <div className="flex">
        <div className="w-[50%] mt-2">
          <CustomTestButton
            number={15}
            name={"SAVE PURCHASES INFORMATION"}
            onClick={() => setHide15((prev) => !prev)}
          />
          {hide15 && (
            <>
              <div className="">
                <CustomInput
                  name={"Invoice Number"}
                  type={"number"}
                  value={invcNo}
                  onchange={(e) => setInvcNo(e.target.value)}
                  required
                  className={"h-[50px] w-auto border p-2"}
                />
                <CustomInput
                  name={"Original Invoice Number"}
                  required
                  value={orgInvcNo}
                  onchange={(e) => setOrgInvNo(e.target.value)}
                  type={"number"}
                  className={"h-[50px] w-auto border p-2"}
                />
                <CustomInput
                  name={"Purchase Date"}
                  type={"date"}
                  required
                  value={pchsDt}
                  onchange={(e) => setPchsDt(e.target.value)}
                  className={"h-[50px] w-auto border p-2"}
                />{" "}
                <CustomInput
                  name={"Registration Name"}
                  value={PurRegrNm}
                  onchange={(e) => setPurRegrNm(e.target.value)}
                  required
                  className={"h-[50px] w-auto border p-2"}
                />{" "}
                <CustomInput
                  name={"Registration ID"}
                  value={PurRegrId}
                  onchange={(e) => setPurRegrId(e.target.value)}
                  required
                  className={"h-[50px] w-auto border p-2"}
                />{" "}
                <CustomInput
                  name={"Modifier ID"}
                  value={PurModId}
                  onchange={(e) => setPurModId(e.target.value)}
                  required
                  className={"h-[50px] w-auto border p-2"}
                />{" "}
                <CustomInput
                  name={"Modifier Name"}
                  value={PurModNm}
                  onchange={(e) => setPurModNm(e.target.value)}
                  required
                  className={"h-[50px] w-auto border p-2"}
                />
                <CustomInput
                  name={"Item Classification Code"}
                  value={PurItemClsCd}
                  onchange={(e) => setPurItemClsCd(e.target.value)}
                  required
                  className={"h-[50px] w-auto border p-2"}
                />{" "}
                <CustomInput
                  name={"Item Name"}
                  value={PurItemNm}
                  onchange={(e) => setPurItemNm(e.target.value)}
                  required
                  className={"h-[50px] w-auto border p-2"}
                />{" "}
                <CustomInput
                  name={"Quantity"}
                  type={"number"}
                  value={qty}
                  onchange={(e) => setQty(e.target.value)}
                  required
                  className={"h-[50px] w-auto border p-2"}
                />{" "}
                <CustomInput
                  name={"Unit Price"}
                  value={prc}
                  onchange={(e) => setPrc(e.target.value)}
                  type={"number"}
                  required
                  className={"h-[50px] w-auto border p-2"}
                />{" "}
              </div>
              <CustomSubmitBtn
                submitting={submitting}
                onClick={savePurchaseInfo}
              />
            </>
          )}
        </div>
        {hide15 && <CustomResponse response={response} />}
      </div>
      <div className="flex">
        <div className="w-[50%] mt-2">
          <CustomTestButton
            number={16}
            name={"SAVE STOCK-MASTER INFORMATION"}
            onClick={() => setHide16((prev) => !prev)}
          />
          {hide16 && (
            <>
              <div className="">
                <CustomInput
                  name={"Item Code"}
                  value={sItemCd}
                  onchange={(e) => setSitemCd(e.target.value)}
                  required
                  className={"h-[50px] w-auto border p-2"}
                />
                <CustomInput
                  name={"Remain Quantity"}
                  required
                  value={rsdQty}
                  type={"number"}
                  onchange={(e) => setRsdQty(e.target.value)}
                  className={"h-[50px] w-auto border p-2"}
                />
                <CustomInput
                  name={"Registration ID"}
                  required
                  value={sRegrId}
                  onchange={(e) => setSRegrId(e.target.value)}
                  className={"h-[50px] w-auto border p-2"}
                />
                <CustomInput
                  name={"Registration Name"}
                  value={sRegrNm}
                  onchange={(e) => setSRegrNm(e.target.value)}
                  required
                  className={"h-[50px] w-auto border p-2"}
                />
                <CustomInput
                  name={"Modifier ID"}
                  value={sModrId}
                  onchange={(e) => setSModrId(e.target.value)}
                  required
                  className={"h-[50px] w-auto border p-2"}
                />
                <CustomInput
                  name={"Modifier Name"}
                  value={sModrNm}
                  onchange={(e) => setSModrNm(e.target.value)}
                  required
                  className={"h-[50px] w-auto border p-2"}
                />
              </div>
              <CustomSubmitBtn
                submitting={submitting}
                onClick={saveStockMaster}
              />
            </>
          )}
        </div>
        {hide16 && <CustomResponse response={response} />}
      </div>
      <div className="flex">
        <div className="w-[50%] mt-2">
          <CustomTestButton
            number={17}
            name={"LOOK UP STOCK MOVEMENT"}
            onClick={() => setHide17((prev) => !prev)}
          />
          {hide17 && (
            <>
              <div className="">
                <CustomInput
                  name={"Last Request Date"}
                  required
                  value={lastReqDt7}
                  type={"date"}
                  onchange={(e) => setLastReqDt7(e.target.value)}
                  className={"h-[50px] w-auto border p-2"}
                />
              </div>
              <CustomSubmitBtn
                submitting={submitting}
                onClick={lookupStockMaster}
              />
            </>
          )}
        </div>
        {hide17 && <CustomResponse response={response} />}
      </div>
      <div className="flex">
        <div className="w-[50%] mt-2">
          <CustomTestButton
            number={18}
            name={"SAVE STOCK IN/OUT"}
            onClick={() => setHide18((prev) => !prev)}
          />
          {hide18 && (
            <>
              <div className="">
                <CustomInput
                  name={"Stored and Release Number"}
                  required
                  value={sarNo}
                  type={"number"}
                  onchange={(e) => setSarNo(e.target.value)}
                  className={"h-[50px] w-auto border p-2"}
                />
                <CustomInput
                  name={"Original Stored Number"}
                  required
                  type={"number"}
                  value={orgSarNo}
                  onchange={(e) => setOrgSarNo(e.target.value)}
                  className={"h-[50px] w-auto border p-2"}
                />
                <CustomInput
                  name={"Occured Date Time"}
                  required
                  type={"date"}
                  value={ocrnDt}
                  onchange={(e) => setOcrnDt(e.target.value)}
                  className={"h-[50px] w-auto border p-2"}
                />{" "}
                <CustomInput
                  name={"Registration ID"}
                  required
                  value={IOregrId}
                  onchange={(e) => setIORegrId(e.target.value)}
                  className={"h-[50px] w-auto border p-2"}
                />{" "}
                <CustomInput
                  name={"Registration Name"}
                  required
                  value={IOregrNm}
                  onchange={(e) => setIORegrNm(e.target.value)}
                  className={"h-[50px] w-auto border p-2"}
                />{" "}
                <CustomInput
                  name={"Modifier ID"}
                  value={IOmodId}
                  onchange={(e) => setIOmodrId(e.target.value)}
                  required
                  className={"h-[50px] w-auto border p-2"}
                />
                <CustomInput
                  name={"Modifier Name"}
                  value={IOmodNm}
                  onchange={(e) => setIOmodrNm(e.target.value)}
                  required
                  className={"h-[50px] w-auto border p-2"}
                />
                <CustomInput
                  name={"Item Class Code"}
                  required
                  value={IOitemClsCd}
                  onchange={(e) => setIOitemclsCd(e.target.value)}
                  className={"h-[50px] w-auto border p-2"}
                />
                <CustomInput
                  name={"Item Name"}
                  value={IOitemNm}
                  onchange={(e) => setIOitemNm(e.target.value)}
                  required
                  className={"h-[50px] w-auto border p-2"}
                />
                <CustomInput
                  name={"Unit Quantity"}
                  value={IOqty}
                  type={"number"}
                  onchange={(e) => setIOqty(e.target.value)}
                  required
                  className={"h-[50px] w-auto border p-2"}
                />
                <CustomInput
                  name={"Unit Price"}
                  type={"number"}
                  value={IOprc}
                  onchange={(e) => setIOprc(e.target.value)}
                  required
                  className={"h-[50px] w-auto border p-2"}
                />
              </div>
              <CustomSubmitBtn submitting={submitting} onClick={saveStockIO} />
            </>
          )}
        </div>
        {hide18 && <CustomResponse response={response} />}
      </div>
      <div className="flex">
        <div className="w-[50%] mt-2">
          <CustomTestButton
            number={19}
            name={"Look Up Product List"}
            onClick={() => setHide19((prev) => !prev)}
          />
          {hide19 && (
            <>
              <div className="">
                <CustomInput
                  name={"Last Request Date"}
                  required
                  value={lastReqDt8}
                  onchange={(e) => setLastReqDt8(e.target.value)}
                  type={"date"}
                  className={"h-[50px] w-auto border p-2"}
                />
              </div>
              <CustomSubmitBtn
                submitting={submitting}
                onClick={lookupProductList}
              />
            </>
          )}
        </div>
        {hide19 && <CustomResponse response={response} />}
      </div>
    </div>
  );
};

export default ApiTesting;

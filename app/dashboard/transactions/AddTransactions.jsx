"use client";
import React, { useEffect, useState } from "react";
import { Modal, Select, Spin } from "antd";
import CustomInput from "@/app/ui/reusableComponents/CustomInput";
import CustomButton from "@/app/ui/reusableComponents/CustomButton";
import {
  addTransaction,
  fetchComodities,
  fetchCompanies,
} from "@/app/services/adminServices";
import { useCustomToast } from "@/app/hooks/useToast";
import CustomSelect from "@/app/ui/reusableComponents/CustomSelect";
import {
  invoiceStatusOptions,
  packagingUnitOptions,
  paymentTypeOptions,
  purchaseOptions,
  quantityUnitOptions,
  recieptTypeOptions,
  taxTypeOptions,
} from "./options";

import { jwtDecode } from "jwt-decode";
import { formatDateToCustomFormat } from "@/app/ui/reusableFunctions/Utils";

const AddTransactions = ({ handleClose, isOpen, onSaved }) => {
  const [classCode, setClassCode] = useState("");
  const [_comodities, setComodities] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const { business_class } = jwtDecode(token);
    setClassCode(business_class);
  }, []);

  const getComidities = async (code) => {
    try {
      const { comodities } = await fetchComodities(code);
      setComodities(comodities);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (classCode !== "") {
      getComidities(classCode);
    }
  }, [classCode]);

  console.log(_comodities);

  const comoditiesOptions = _comodities.map((comodity) => {
    return {
      value: comodity?.comodity_code,
      label: comodity?.comodity_name,
    };
  });

  const showToast = useCustomToast();
  // State variables for main fields
  const [trdInvcNo, setTrdInvcNo] = useState(0);
  const [orgInvcNo, setOrgInvcNo] = useState(0);
  const [custTin, setCustTin] = useState("");
  const [custNm, setCustNm] = useState("");
  const [salesTyCd, setSalesTyCd] = useState("");
  const [rcptTyCd, setRcptTyCd] = useState("");
  const [pmtTyCd, setPmtTyCd] = useState("");
  const [salesSttsCd, setSalesSttsCd] = useState("");
  const [cfmDt, setCfmDt] = useState("");
  const [salesDt, setSalesDt] = useState("");
  const [stockRlsDt, setStockRlsDt] = useState("");
  const [cnclReqDt, setCnclReqDt] = useState("");
  const [cnclDt, setCnclDt] = useState("");
  const [rfdDt, setRfdDt] = useState("");
  const [rfdRsnCd, setRfdRsnCd] = useState("");
  const [totItemCnt, setTotItemCnt] = useState(0);
  const [taxblAmtA, setTaxblAmtA] = useState(0);
  const [taxblAmtB, setTaxblAmtB] = useState(0);
  const [taxblAmtC, setTaxblAmtC] = useState(0);
  const [taxblAmtD, setTaxblAmtD] = useState(0);
  const [taxblAmtE, setTaxblAmtE] = useState(0);
  const [taxRtA, setTaxRtA] = useState(0);
  const [taxRtB, setTaxRtB] = useState(0);
  const [taxRtC, setTaxRtC] = useState(0);
  const [taxRtD, setTaxRtD] = useState(0);
  const [taxRtE, setTaxRtE] = useState(0);
  const [taxAmtA, setTaxAmtA] = useState(0);
  const [taxAmtB, setTaxAmtB] = useState(0);
  const [taxAmtC, setTaxAmtC] = useState(0);
  const [taxAmtD, setTaxAmtD] = useState(0);
  const [taxAmtE, setTaxAmtE] = useState(0);
  const [totTaxblAmt, setTotTaxblAmt] = useState(0);
  const [totTaxAmt, setTotTaxAmt] = useState(0);
  const [totAmt, setTotAmt] = useState(0);
  const [prchrAcptcYn, setPrchrAcptcYn] = useState("");
  const [remark, setRemark] = useState("");
  const [regrId, setRegrId] = useState("");
  const [regrNm, setRegrNm] = useState("");
  const [modrId, setModrId] = useState("");
  const [itemList, setItemList] = useState([]);
  const [modrNm, setModrNm] = useState("");

  // State variables for sales receipt information
  const [receiptCustTin, setReceiptCustTin] = useState("");
  const [receiptCustMblNo, setReceiptCustMblNo] = useState("");
  const [rcptPbctDt, setRcptPbctDt] = useState("");
  const [trdeNm, setTrdeNm] = useState("");
  const [adrs, setAdrs] = useState("");
  const [topMsg, setTopMsg] = useState("");
  const [btmMsg, setBtmMsg] = useState("");
  const [receiptPrchrAcptcYn, setReceiptPrchrAcptcYn] = useState("");

  // State variables for item information
  const [itemCd, setItemCd] = useState("");
  const [itemClsCd, setItemClsCd] = useState("");
  const [itemNm, setItemNm] = useState("");
  const [bcd, setBcd] = useState("");
  const [pkgUnitCd, setPkgUnitCd] = useState("NT");
  const [pkg, setPkg] = useState(0);
  const [qtyUnitCd, setQtyUnitCd] = useState("U");
  const [qty, setQty] = useState(0);
  const [prc, setPrc] = useState(0);
  const [splyAmt, setSplyAmt] = useState(0);
  const [dcRt, setDcRt] = useState(0);
  const [dcAmt, setDcAmt] = useState("");
  const [isrccCd, setIsrccCd] = useState("");
  const [isrccNm, setIsrccNm] = useState("");
  const [isrcRt, setIsrcRt] = useState("");
  const [isrcAmt, setIsrcAmt] = useState("");
  const [taxTyCd, setTaxTyCd] = useState("B");
  const [taxblAmt, setTaxblAmt] = useState(0);
  const [taxAmt, setTaxAmt] = useState(0);
  const [totAmtItem, setTotAmtItem] = useState(0);
  const [loading, setLoading] = useState(false);

  // Function to handle adding a new item
  const handleAddItem = () => {
    const newItem = {
      itemSeq: itemList.length + 1,
      itemCd,
      itemClsCd,
      itemNm,
      bcd,
      pkgUnitCd,
      pkg,
      qtyUnitCd,
      qty,
      prc,
      splyAmt,
      dcRt,
      dcAmt,
      isrccCd,
      isrccNm,
      isrcRt,
      isrcAmt,
      taxTyCd,
      taxblAmt,
      taxAmt,
      totAmt: totAmtItem,
    };
    setItemList((prevItemList) => [...prevItemList, newItem]);
  };
  const handleRemoveLastItem = () => {
    setItemList((prevItemList) => {
      const newList = [...prevItemList];
      newList.pop(); // Remove the last item
      return newList;
    });
  };
  // Function to handle form submission
  const handleSubmit = async () => {
    try {
      setLoading(true);
      // Logic for form submission
      const formData = {
        trdInvcNo,
        orgInvcNo,
        custTin,
        custNm,
        salesTyCd,
        rcptTyCd,
        pmtTyCd,
        salesSttsCd,
        cfmDt: formatDateToCustomFormat(cfmDt),
        salesDt: salesDt.replace(/-/g, ""),
        stockRlsDt: formatDateToCustomFormat(stockRlsDt),
        cnclReqDt: formatDateToCustomFormat(cnclReqDt),
        cnclDt: formatDateToCustomFormat(cnclDt),
        rfdDt: formatDateToCustomFormat(rfdDt),
        rfdRsnCd,
        totItemCnt: itemList?.length,
        taxblAmtA,
        taxblAmtB,
        taxblAmtC,
        taxblAmtD,
        taxblAmtE,
        taxRtA,
        taxRtB,
        taxRtC,
        taxRtD,
        taxRtE,
        taxAmtA,
        taxAmtB,
        taxAmtC,
        taxAmtD,
        taxAmtE,
        totTaxblAmt,
        totTaxAmt,
        totAmt,
        prchrAcptcYn,
        remark,
        regrId,
        regrNm,
        modrId,
        modrNm,
        receipt: {
          custTin: receiptCustTin,
          custMblNo: receiptCustMblNo,
          rcptPbctDt: formatDateToCustomFormat(rcptPbctDt),
          trdeNm,
          adrs,
          topMsg,
          btmMsg,
          prchrAcptcYn: receiptPrchrAcptcYn,
        },
        itemList,
      };
      await addTransaction(formData);
      setLoading(false);
      showToast("Sales information added successfully");
      onSaved();
      handleClose();
    } catch (error) {
      setLoading(false);
      showToast(error.response?.data?.data?.resultMsg, "error");
    }
  };

  const get_financial_figures = (taxTypeCode, quantity, unitPrice) => {
    const taxableAmount = quantity * unitPrice;
    let totalTax = 0;
    if (taxTypeCode == "A") {
      totalTax = taxableAmount * 0;
    } else if (taxTypeCode == "B") {
      totalTax = taxableAmount * (16 / 100);
    } else if (taxTypeCode == "C") {
      totalTax = taxableAmount * 0;
    } else if (taxTypeCode == "D") {
      totalTax = taxableAmount * 0;
    } else if (taxTypeCode == "E") {
      totalTax = taxableAmount * (8 / 100);
    } else {
      console.error("Invalid tax type code");
    }
    const totalAmount = taxableAmount + totalTax;
    return {
      totalAmount: totalAmount,
      totalTax: totalTax.toFixed(2),
      taxableAmount: taxableAmount,
    };
  };

  useEffect(() => {
    const { totalAmount, totalTax, taxableAmount } = get_financial_figures(
      taxTyCd,
      qty,
      prc
    );
    setTotAmtItem(totalAmount);
    setTaxAmt(totalTax);
    setTaxblAmt(taxableAmount);
  }, [taxTyCd, qty, prc]);

  return (
    <Modal
      style={{ margin: "0 0", padding: "0 0" }}
      open={isOpen}
      title={"Add sales information"}
      onCancel={handleClose}
      width={800}
      centered
      footer={null}
    >
      <div
        className=" scroll-smooth overflow-y-auto h-[600px]"
        style={{ maxHeight: "600px" }}
      >
        {loading ? (
          <Spin
            spinning={loading}
            delay={500}
            size="large"
            className="flex justify-center content-center "
          />
        ) : (
          <>
            <div className="flex flex-wrap justify-evenly border rounded p-4">
              <CustomInput
                name={"Trader Invoice Number"}
                required
                value={trdInvcNo}
                onchange={(e) => setTrdInvcNo(e.target.value)}
                type={"number"}
                className={"h-[40px] border rounded-md p-2"}
              />
              <CustomInput
                name={"Original Invoice Number"}
                type={"number"}
                value={orgInvcNo}
                onchange={(e) => setOrgInvcNo(e.target.value)}
                className={"h-[40px] border rounded-md p-2"}
                required
              />
              <CustomInput
                name={"Customer PIN"}
                value={custTin}
                onchange={(e) => setCustTin(e.target.value)}
                className={"h-[40px] border rounded-md p-2"}
              />
              <CustomInput
                name={"Customer Name"}
                value={custNm}
                onchange={(e) => setCustNm(e.target.value)}
                className={"h-[40px] border rounded-md p-2"}
              />
              <CustomSelect
                name={"Receipt Type Code"}
                required={true}
                placeholder="Select reciept type code"
                options={recieptTypeOptions}
                onChange={(value) => setRcptTyCd(value)}
                className={"h-[60px] w-[200px] rounded-md p-2"}
              />
              <CustomSelect
                name={"Payment Type Code"}
                required={false}
                placeholder="Select payment type code"
                options={paymentTypeOptions}
                onChange={(value) => setPmtTyCd(value)}
                className={"h-[60px] w-[200px] rounded-md p-2"}
              />
              <CustomSelect
                name={"Invoice Status Code"}
                required={false}
                placeholder="Select invoice status code"
                options={invoiceStatusOptions}
                onChange={(value) => setSalesSttsCd(value)}
                className={"h-[60px] w-[200px] rounded-md p-2"}
              />
              <CustomInput
                name={"Validated Date"}
                required
                value={cfmDt}
                onchange={(e) => setCfmDt(e.target.value)}
                className={"h-[40px] w-[200px] border rounded-md p-2"}
                type={"date"}
              />
              <CustomInput
                name={"Sale Date"}
                value={salesDt}
                onchange={(e) => setSalesDt(e.target.value)}
                required
                className={"h-[40px] w-[200px] border rounded-md p-2"}
                type={"date"}
              />
              <CustomInput
                name={"Stock Released Date"}
                value={stockRlsDt}
                onchange={(e) => setStockRlsDt(e.target.value)}
                type={"date"}
                className={"h-[40px] w-[200px] border rounded-md p-2"}
              />
              <CustomInput
                name={"Cancel Requested Date"}
                value={cnclReqDt}
                onchange={(e) => setCnclReqDt(e.target.value)}
                className={"h-[40px] border rounded-md p-2"}
                type={"date"}
              />
              <CustomInput
                name={"Cancel  Date"}
                value={cnclDt}
                onchange={(e) => setCnclDt(e.target.value)}
                className={"h-[40px] w-[200px] border rounded-md p-2"}
                type={"date"}
              />
              <CustomInput
                name={"Credit Note  Date"}
                value={rfdDt}
                onchange={(e) => setRfdDt(e.target.value)}
                className={"h-[40px] w-[200px] border rounded-md p-2"}
                type={"date"}
              />
              <CustomInput
                name={"Credit Note  Reason Code"}
                value={rfdRsnCd}
                onchange={(e) => setRfdRsnCd(e.target.value)}
                className={"h-[40px] border rounded-md p-2"}
              />
              <CustomInput
                name={"Total Item Count"}
                value={itemList.length}
                type={"number"}
                disabled
                required
                className={"h-[40px]  border rounded-md p-2"}
              />
              <CustomInput
                name={"Taxable Amount A"}
                value={taxblAmtA}
                disabled
                onchange={(e) => setTaxblAmtA(e.target.value)}
                type={"number"}
                required
                className={"h-[40px]  border rounded-md p-2"}
              />
              <CustomInput
                name={"Taxable Amount B"}
                value={taxblAmtB}
                disabled
                onchange={(e) => setTaxblAmtB(e.target.value)}
                type={"number"}
                required
                className={"h-[40px] border rounded-md p-2"}
              />
              <CustomInput
                name={"Taxable Amount C"}
                disabled
                value={taxblAmtC}
                onchange={(e) => setTaxblAmtC(e.target.value)}
                type={"number"}
                required
                className={"h-[40px]  border rounded-md p-2"}
              />
              <CustomInput
                name={"Taxable Amount D"}
                value={taxblAmtD}
                onchange={(e) => setTaxblAmtD(e.target.value)}
                type={"number"}
                required
                disabled
                className={"h-[40px]  border rounded-md p-2"}
              />
              <CustomInput
                disabled
                name={"Taxable Amount E"}
                value={taxblAmtE}
                onchange={(e) => setTaxblAmtE(e.target.value)}
                type={"number"}
                required
                className={"h-[40px]  border rounded-md p-2"}
              />
              <CustomInput
                name={"Tax Rate A"}
                disabled
                value={taxRtA}
                onchange={(e) => setTaxRtA(e.target.value)}
                type={"number"}
                required
                className={"h-[40px]  border rounded-md p-2"}
              />
              <CustomInput
                name={"Tax Rate B"}
                disabled
                value={taxRtB}
                onchange={(e) => setTaxRtB(e.target.value)}
                type={"number"}
                required
                className={"h-[40px]  border rounded-md p-2"}
              />
              <CustomInput
                name={"Tax Rate C"}
                disabled
                value={taxRtC}
                onchange={(e) => setTaxRtC(e.target.value)}
                type={"number"}
                required
                className={"h-[40px]  border rounded-md p-2"}
              />
              <CustomInput
                disabled
                name={"Tax Rate D"}
                value={taxRtD}
                onchange={(e) => setTaxRtD(e.target.value)}
                type={"number"}
                required
                className={"h-[40px]  border rounded-md p-2"}
              />
              <CustomInput
                disabled
                name={"Tax Rate E"}
                value={taxRtE}
                onchange={(e) => setTaxRtE(e.target.value)}
                type={"number"}
                required
                className={"h-[40px]  border rounded-md p-2"}
              />
              <CustomInput
                disabled
                name={"Tax Amount A"}
                value={taxAmtA}
                onchange={(e) => setTaxAmtA(e.target.value)}
                type={"number"}
                required
                className={"h-[40px]  border rounded-md p-2"}
              />
              <CustomInput
                name={"Tax Amount B"}
                disabled
                value={taxAmtB}
                onchange={(e) => setTaxAmtB(e.target.value)}
                type={"number"}
                required
                className={"h-[40px]  border rounded-md p-2"}
              />
              <CustomInput
                name={"Tax Amount C"}
                value={taxAmtC}
                onchange={(e) => setTaxAmtC(e.target.value)}
                type={"number"}
                required
                className={"h-[40px]  border rounded-md p-2"}
              />
              <CustomInput
                name={"Tax Amount D"}
                value={taxAmtD}
                onchange={(e) => setTaxAmtD(e.target.value)}
                type={"number"}
                required
                className={"h-[40px]  border rounded-md p-2"}
              />
              <CustomInput
                name={"Tax Amount E"}
                value={taxAmtE}
                onchange={(e) => setTaxAmtE(e.target.value)}
                type={"number"}
                required
                className={"h-[40px]  border rounded-md p-2"}
              />{" "}
              <CustomInput
                name={"Total Taxable Amount"}
                value={totTaxblAmt}
                onchange={(e) => setTotTaxblAmt(e.target.value)}
                type={"number"}
                required
                className={"h-[40px]  border rounded-md p-2"}
              />{" "}
              <CustomInput
                name={"Total Tax Amount"}
                value={totTaxAmt}
                onchange={(e) => setTotTaxAmt(e.target.value)}
                type={"number"}
                required
                className={"h-[40px]  border rounded-md p-2"}
              />
              <CustomInput
                name={"Total  Amount"}
                value={totAmt}
                onchange={(e) => setTotAmt(e.target.value)}
                type={"number"}
                required
                className={"h-[40px]  border rounded-md p-2"}
              />
              <div className="mt-2">
                <label htmlFor="prchrAcptcYn">Purchase Accept Y/N</label>
                <Select
                  showSearch
                  placeholder="Yes or No?"
                  className="w-[80%] h-[50px]"
                  id="prchrAcptcYn"
                  options={purchaseOptions}
                  onChange={(value) => setPrchrAcptcYn(value)}
                />
              </div>
              <CustomInput
                name={"Remark"}
                className={"h-[40px]  border rounded-md p-2"}
                value={remark}
                onchange={(e) => setRemark(e.target.value)}
              />
              <CustomInput
                name={"Registration ID"}
                value={regrId}
                onchange={(e) => setRegrId(e.target.value)}
                required
                className={"h-[40px]  border rounded-md p-2"}
              />
              <CustomInput
                name={"Registration Name"}
                value={regrNm}
                onchange={(e) => setRegrNm(e.target.value)}
                required
                className={"h-[40px]  border rounded-md p-2"}
              />
              <CustomInput
                name={"Modifier ID"}
                value={modrId}
                onchange={(e) => setModrId(e.target.value)}
                required
                className={"h-[40px]  border rounded-md p-2"}
              />
              <CustomInput
                name={"Modifier Name"}
                value={modrNm}
                onchange={(e) => setModrNm(e.target.value)}
                required
                className={"h-[40px]  border rounded-md p-2"}
              />
            </div>
            <p className="flex justify-center text-[20px] mt-2 underline">
              Sales reciept information
            </p>
            <div className="flex flex-wrap justify-evenly border rounded p-4">
              <CustomInput
                name={"Customer PIN"}
                value={receiptCustTin}
                onchange={(e) => setReceiptCustTin(e.target.value)}
                className={"h-[40px]  border rounded-md p-2"}
              />{" "}
              <CustomInput
                name={"Customer Mobile Number"}
                value={receiptCustMblNo}
                onchange={(e) => setReceiptCustMblNo(e.target.value)}
                className={"h-[40px]  border rounded-md p-2"}
              />{" "}
              <CustomInput
                name={"Receipt Published Date"}
                value={rcptPbctDt}
                onchange={(e) => setRcptPbctDt(e.target.value)}
                required
                type={"date"}
                className={"h-[40px] w-[200px] border rounded-md p-2"}
              />{" "}
              <CustomInput
                name={"Trand Name"}
                value={trdeNm}
                onchange={(e) => setTrdeNm(e.target.value)}
                className={"h-[40px]  border rounded-md p-2"}
              />
              <CustomInput
                name={"Address"}
                value={adrs}
                onchange={(e) => setAdrs(e.target.value)}
                className={"h-[40px]  border rounded-md p-2"}
              />
              <CustomInput
                name={"Top Message"}
                value={topMsg}
                onchange={(e) => setTopMsg(e.target.value)}
                className={"h-[40px]  border rounded-md p-2"}
              />
              <CustomInput
                name={"Bottom Message"}
                value={btmMsg}
                onchange={(e) => setBtmMsg(e.target.value)}
                className={"h-[40px]  border rounded-md p-2"}
              />
              <CustomSelect
                required
                name={"Purchase Accept Y/N"}
                options={purchaseOptions}
                placeholder={"Select purchase accept"}
                className={"h-[60px] w-[200px] rounded-md p-2"}
              />
            </div>
            <p className="flex justify-center text-[20px] mt-2 underline">
              Deal sale registration item information
            </p>
            <p className="font-bold mb-4 text-[20px]">
              Items in list : {itemList.length > 0 ? itemList.length : 0}
            </p>
            <div className="flex flex-wrap justify-evenly border rounded p-4">
              <CustomInput
                name={"Item  Code"}
                value={itemCd}
                onchange={(e) => setItemCd(e.target.value)}
                className={"h-[40px]  border rounded-md p-2"}
              />
              <CustomSelect
                name={"Item Classification Code"}
                required
                placeholder={"Select item class code"}
                options={comoditiesOptions}
                className={"h-[60px] w-[300px] rounded-md p-2"}
                onChange={(value) => setItemClsCd(value)}
              />
              <CustomInput
                name={"Item Name"}
                value={itemNm}
                onchange={(e) => setItemNm(e.target.value)}
                required
                className={"h-[40px]  border rounded-md p-2"}
              />{" "}
              <CustomInput
                name={"Barcode"}
                value={bcd}
                onchange={(e) => setBcd(e.target.value)}
                className={"h-[40px]  border rounded-md p-2"}
              />{" "}
              <CustomSelect
                name={"Packaging Unit Code"}
                required
                placeholder={"Select packaging unit"}
                options={packagingUnitOptions}
                className={"h-[60px] w-[200px] rounded-md p-2"}
                onChange={(value) => setPkgUnitCd(value)}
              />
              <CustomInput
                name={"Package"}
                value={pkg}
                onchange={(e) => setPkg(e.target.value)}
                type={"number"}
                required
                className={"h-[40px]  border rounded-md p-2"}
              />
              <CustomSelect
                name={"Quantity Unit Code"}
                required
                placeholder={"Select quantity code"}
                options={quantityUnitOptions}
                className={"h-[60px] w-[200px] rounded-md p-2"}
                onChange={(value) => setQtyUnitCd(value)}
              />
              <CustomInput
                name={"Quantity"}
                value={qty}
                onchange={(e) => setQty(e.target.value)}
                type={"number"}
                required
                className={"h-[40px]  border rounded-md p-2"}
              />
              <CustomInput
                name={"Unit Price"}
                value={prc}
                onchange={(e) => setPrc(e.target.value)}
                type={"number"}
                required
                className={"h-[40px]  border rounded-md p-2"}
              />
              <CustomInput
                name={"Supply Amount"}
                value={splyAmt}
                onchange={(e) => setSplyAmt(e.target.value)}
                type={"number"}
                required
                className={"h-[40px]  border rounded-md p-2"}
              />
              <CustomInput
                name={"Discount Rate"}
                value={dcRt}
                onchange={(e) => setDcRt(e.target.value)}
                type={"number"}
                required
                className={"h-[40px]  border rounded-md p-2"}
              />
              <CustomInput
                name={"Discount Amount"}
                value={dcAmt}
                onchange={(e) => setDcAmt(e.target.value)}
                type={"number"}
                required
                className={"h-[40px]  border rounded-md p-2"}
              />
              <CustomInput
                name={"Insurance Company Code"}
                value={isrccCd}
                onchange={(e) => setIsrccCd(e.target.value)}
                className={"h-[40px]  border rounded-md p-2"}
              />
              <CustomInput
                name={"Insurance Company Name"}
                value={isrccNm}
                onchange={(e) => setIsrccNm(e.target.value)}
                className={"h-[40px]  border rounded-md p-2"}
              />
              <CustomInput
                name={"Insurance  Rate"}
                value={isrcRt}
                onchange={(e) => setIsrcRt(e.target.value)}
                type={"number"}
                className={"h-[40px]  border rounded-md p-2"}
              />
              <CustomInput
                name={"Insurance Amount"}
                value={isrcAmt}
                onchange={(e) => setIsrcAmt(e.target.value)}
                type={"number"}
                className={"h-[40px]  border rounded-md p-2"}
              />
              <CustomSelect
                name={"Taxation Type Code"}
                required={true}
                placeholder={"Select taxation type"}
                options={taxTypeOptions}
                className={"h-[60px] w-[200px] rounded-md p-2"}
                onChange={(value) => setTaxTyCd(value)}
              />
              <CustomInput
                name={"Taxable Amount"}
                value={taxblAmt}
                onchange={(e) => setTaxblAmt(e.target.value)}
                type={"number"}
                disabled
                required
                className={"h-[40px]  border rounded-md p-2"}
              />
              <CustomInput
                name={"Tax Amount"}
                value={taxAmt}
                disabled
                onchange={(e) => setTaxAmt(e.target.value)}
                required
                type={"number"}
                className={"h-[40px]  border rounded-md p-2"}
              />
              <CustomInput
                name={"Total Amount"}
                disabled
                value={totAmtItem}
                onchange={(e) => setTotAmtItem(e.target.value)}
                type={"number"}
                required
                className={"h-[40px]  border rounded-md p-2"}
              />
            </div>
            <div className="flex justify-end gap-2">
              <CustomButton
                name={itemList.length > 0 ? "Add another item" : "Add item"}
                className={
                  "bg-[#6969df] p-3 mt-3 h-[50px] text-white font-bold rounded-md w-[200px] mb-5"
                }
                onClick={handleAddItem}
              />
              {itemList.length > 0 ? (
                <CustomButton
                  name={"Remove Item"}
                  className={
                    "bg-[#ce2a2a] p-3 mt-3 h-[50px] text-white font-bold rounded-md w-[200px] mb-5"
                  }
                  onClick={handleRemoveLastItem}
                />
              ) : (
                ""
              )}
            </div>
          </>
        )}
      </div>
      <div className="flex justify-center gap-10">
        <CustomButton
          name={"Cancel"}
          className={"bg-[#ff1414] text-white p-3 w-[200px] rounded-md"}
          onClick={handleClose}
        />
        <CustomButton
          name={loading ? "Saving Sale Info" : "Add Sale Info"}
          onClick={handleSubmit}
          className={"bg-[#bea54c] text-white p-3 w-[200px] rounded-md"}
        />
      </div>
    </Modal>
  );
};

export default AddTransactions;

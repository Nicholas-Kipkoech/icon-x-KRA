"use client";
import { fetchTransactionsById } from "@/app/services/adminServices";
import CustomButton from "@/app/ui/reusableComponents/CustomButton";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { MdDataUsage } from "react-icons/md";

const TransactionDetails = ({ params: { transactionDetails } }) => {
  const router = useRouter();
  const [transactionDetail, setTransactionDetail] = useState([]);
  const [transactionResponse, setTransactionReponse] = useState([]);
  useEffect(() => {
    const getTransactionById = async () => {
      const { transaction, transactionResponse } = await fetchTransactionsById(
        transactionDetails
      );
      setTransactionDetail(transaction);
      setTransactionReponse(transactionResponse);
    };
    getTransactionById();
  }, [transactionDetails]);

  const PTag = ({ tag, name }) => {
    return (
      <p className="border rounded-sm p-[14px] w-[100%] flex leading-7">
        <div className="h-[100%] pr-2 font-bold">{name}</div>:{" "}
        <div className="ml-2 text-[black]">{tag ? tag : "Null"}</div>
      </p>
    );
  };

  return (
    <div className="mt-[10px]">
      <div className="flex justify-between items-center m-[10px] ">
        <CustomButton
          name={"Back"}
          onClick={() => router.back()}
          className={"bg-red-500 p-2 rounded-md w-[200px] text-white"}
        />
        <div className="text-[30px] font-bold ">Transaction Details</div>
      </div>
      <div className="border rounded-md  h-[auto]  gap-[20px] mb-[10px] bg-[whitesmoke]">
        <p className="flex justify-center text-[20px] font-bold">
          Transaction Response
        </p>
        <PTag
          name={"Transaction ID "}
          tag={transactionResponse.transactionID}
        />
        <PTag name={"Reciept Signature"} tag={transactionResponse.rcptSign} />
        <PTag name={"Internal Data"} tag={transactionResponse.intrlData} />
        <PTag name={"Result Message"} tag={transactionResponse.resultMsg} />
      </div>
      <div className="border rounded-md  h-[auto]  gap-[20px] mb-[10px] bg-[whitesmoke]">
        <PTag name={"Transaction ID"} tag={transactionDetail.transactionID} />
        <PTag
          name={"Invoice Status Code"}
          tag={transactionDetail.salesSttsCd}
        />
        <PTag name={"Validated Date"} tag={transactionDetail.cfmDt} />
        <PTag name={"Sales Date"} tag={transactionDetail.salesDt} />
        <PTag name={"Stock Released Date"} tag={transactionDetail.stockRlsDt} />
        <PTag
          name={"Cancel Requested Date"}
          tag={transactionDetail.cnclReqDt}
        />
        <PTag name={"Canceled Date"} tag={transactionDetail.cnclDt} />
        <PTag name={"Credit Note Date"} tag={transactionDetail.rfdDt} />
        <PTag
          name={"Credit Note Reason Code"}
          tag={transactionDetail.rfdRsnCd}
        />
        <PTag name={"Total Item Count"} tag={transactionDetail.totItemCnt} />
        <PTag name={"Taxable Amount A"} tag={transactionDetail.taxblAmtA} />
        <PTag name={"Taxable Amount B"} tag={transactionDetail.taxblAmtB} />
        <PTag name={"Taxable Amount C"} tag={transactionDetail.taxblAmtC} />
        <PTag name={"Taxable Amount D"} tag={transactionDetail.taxblAmtD} />
        <PTag name={"Taxable Amount E"} tag={transactionDetail.taxblAmtE} />
        <PTag name={"Tax Rate A"} tag={transactionDetail.taxRtA} />
        <PTag name={"Tax Rate B"} tag={transactionDetail.taxRtB} />
        <PTag name={"Tax Rate C"} tag={transactionDetail.taxRtC} />
        <PTag name={"Tax Rate D"} tag={transactionDetail.taxRtD} />
        <PTag name={"Tax Rate E"} tag={transactionDetail.taxRtE} />
        <PTag name={"Tax Amounr A"} tag={transactionDetail.taxAmtA} />
        <PTag name={"Tax Amount B"} tag={transactionDetail.taxAmtB} />
        <PTag name={"Tax Amount C"} tag={transactionDetail.taxAmtC} />
        <PTag name={"Tax Amount D"} tag={transactionDetail.taxAmtD} />
        <PTag name={"Tax Amount E"} tag={transactionDetail.taxAmtD} />
        <PTag
          name={"Total Taxable Amount"}
          tag={transactionDetail.totTaxblAmt}
        />
        <PTag name={"Total Tax Amount"} tag={transactionDetail.totTaxAmt} />
        <PTag name={"Total Amount"} tag={transactionDetail.totAmt} />
        <PTag name={"Trade Invoice Number"} tag={transactionDetail.trdInvcNo} />
        <PTag
          name={"System Generated Invoice Number"}
          tag={transactionDetail.invcNo}
        />
        <PTag name={"Customer KRA PIN"} tag={transactionDetail.custTin} />
        <PTag name={"Customer Name"} tag={transactionDetail.custNm} />
        <PTag name={"Modifier ID"} tag={transactionDetail.modrId} />
        <PTag name={"Modifier Name"} tag={transactionDetail.modrNm} />
        <PTag name={"Payment Type Code"} tag={transactionDetail.pmtTyCd} />
        <PTag
          name={"Purchase Accept Y/N"}
          tag={transactionDetail.prchrAcptcYn}
        />
        <PTag name={"Reciept Type Code"} tag={transactionDetail.rcptTyCd} />
        <PTag name={"Remark"} tag={transactionDetail.remark} />
        <PTag name={"Registration ID"} tag={transactionDetail.regrId} />
        <PTag name={"Registration Name"} tag={transactionDetail.regrNm} />
      </div>
      <div className="border rounded-md  h-[auto]  gap-[20px] mb-[10px] bg-[whitesmoke] ">
        <p className="flex justify-center text-[20px] font-bold">
          Sales reciept information{" "}
        </p>
        <PTag name={"Customer PIN"} tag={transactionDetail.receipt?.custTin} />
        <PTag
          name={"Customer Mobile Number"}
          tag={transactionDetail.receipt?.custMblNo}
        />
        <PTag
          name={"Reciept Published Date"}
          tag={transactionDetail.receipt?.rcptPbctDt}
        />
        <PTag name={"Trand Name"} tag={transactionDetail.receipt?.trdeNm} />
        <PTag name={"Address"} tag={transactionDetail.receipt?.adrs} />
        <PTag name={"Top Message"} tag={transactionDetail.receipt?.topMsg} />
        <PTag name={"Bottom Message"} tag={transactionDetail.receipt?.btmMsg} />
        <PTag
          name={"Purchase Accept Y/N"}
          tag={transactionDetail.receipt?.prchrAcptcYn}
        />
      </div>
    </div>
  );
};

export default TransactionDetails;

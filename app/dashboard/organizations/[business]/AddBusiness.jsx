import React, { useState } from "react";
import { Modal } from "antd";
import CustomInput from "@/app/ui/reusableComponents/CustomInput";
import CustomButton from "@/app/ui/reusableComponents/CustomButton";
import { createBusiness } from "@/app/services/adminServices";
import { useCustomToast } from "@/app/hooks/useToast";

const AddBusiness = ({ open, handleClose, organizationID }) => {
  const [checked, setChecked] = useState("self");
  const [businessName, setBusinessName] = useState("");
  const [businessPIN, setBusinessPIN] = useState("");
  const [loading, setLoading] = useState(false);

  const showToast = useCustomToast();

  const handleSubmit = async () => {
    try {
      setLoading(true);
      let formData = new FormData();
      formData.append("organizationId", organizationID);
      formData.append("pin", businessPIN);
      formData.append("businessName", businessName);
      formData.append("businessType", checked);
      await createBusiness(formData);
      setLoading(false);
      showToast("Business created successfully");
      handleClose();
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  const handleRadioChange = (e) => {
    setChecked(e.target.value);
  };

  return (
    <Modal
      open={open}
      title="Add New Business"
      onCancel={handleClose}
      width={600}
      footer={null}
    >
      <div>
        <CustomInput
          name={"Business Name"}
          required
          onchange={(e) => setBusinessName(e.target.value)}
          className={"h-[50px] p-[5px] rounded-md border border-[#995224]"}
        />
        <CustomInput
          name={"KRA PIN"}
          onchange={(e) => setBusinessPIN(e.target.value)}
          required
          className={"h-[50px] p-[5px] rounded-md border border-[#995224]"}
        />
        <p className="mt-2">Type of Business</p>
        <div className="flex gap-2 mt-2">
          <div className="flex gap-2">
            <input
              type="radio"
              id="self"
              name="businessType"
              value="self"
              checked={checked === "self"}
              onChange={handleRadioChange}
            />
            <label htmlFor="self">Self</label>
          </div>
          <div className="flex gap-2">
            <input
              type="radio"
              id="other"
              name="businessType"
              value="other"
              checked={checked === "other"}
              onChange={handleRadioChange}
            />
            <label htmlFor="other">Another Business</label>
          </div>
        </div>

        <div className="flex justify-center gap-[3rem] mt-[2rem] text-white">
          <CustomButton
            name={"Cancel"}
            onClick={handleClose}
            disabled={loading}
            className={"bg-[#092332] h-[40px] w-[200px] rounded-md"}
          />
          <CustomButton
            name={loading ? "Adding Business" : "Add Business"}
            disabled={loading || businessName === ""}
            onClick={handleSubmit}
            className={"bg-[#995224]  w-[200px] rounded-md"}
          />
        </div>
      </div>
    </Modal>
  );
};

export default AddBusiness;

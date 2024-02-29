import React, { useState } from "react";
import { Modal } from "antd";
import CustomInput from "@/app/ui/reusableComponents/CustomInput";
import CustomButton from "@/app/ui/reusableComponents/CustomButton";

const AddBusiness = ({ open, handleClose }) => {
  const [checked, setChecked] = useState("self");

  const handleSubmit = () => {
    console.log(checked);
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
          className={"h-[50px] p-[5px] rounded-md border border-[#995224]"}
        />
        <CustomInput
          name={"KRA PIN"}
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
            <label htmlFor="personal">Self</label>
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
            <label htmlFor="business">Another Business</label>
          </div>
        </div>

        <div className="flex justify-center gap-[3rem] mt-[2rem] text-white">
          <CustomButton
            name={"Cancel"}
            onClick={handleClose}
            className={"bg-[#092332] h-[40px] w-[200px] rounded-md"}
          />
          <CustomButton
            name={"Add Business"}
            onClick={handleSubmit}
            className={"bg-[#995224]  w-[200px] rounded-md"}
          />
        </div>
      </div>
    </Modal>
  );
};

export default AddBusiness;

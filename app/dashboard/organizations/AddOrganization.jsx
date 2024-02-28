import React, { useState } from "react";
import { Modal } from "antd";
import CustomInput from "@/app/ui/reusableComponents/CustomInput";
import CustomButton from "@/app/ui/reusableComponents/CustomButton";

const AddOrganization = ({ open, handleClose }) => {
  const [checked, setChecked] = useState("personal");

  const handleSubmit = () => {
    console.log(checked);
  };

  const handleRadioChange = (e) => {
    setChecked(e.target.value);
  };

  return (
    <Modal
      open={open}
      title="Add Organization"
      onCancel={handleClose}
      width={600}
      footer={null}
    >
      <div>
        <CustomInput
          name={"Organization Name"}
          required
          className={"h-[50px] p-[5px] rounded-md border border-[#995224]"}
        />
        <p className="mt-2">Type of Organization</p>
        <div className="flex gap-2 mt-2">
          <div className="flex gap-2">
            <input
              type="radio"
              id="personal"
              name="organizationType"
              value="personal"
              checked={checked === "personal"}
              onChange={handleRadioChange}
            />
            <label htmlFor="personal">Personal</label>
          </div>
          <div className="flex gap-2">
            <input
              type="radio"
              id="business"
              name="organizationType"
              value="business"
              checked={checked === "business"}
              onChange={handleRadioChange}
            />
            <label htmlFor="business">Business</label>
          </div>
        </div>

        <div className="flex justify-center gap-[3rem] mt-[2rem] text-white">
          <CustomButton
            name={"Cancel"}
            onClick={handleClose}
            className={"bg-[grey] h-[40px] w-[200px] rounded-md"}
          />
          <CustomButton
            name={"Add Organization"}
            onClick={handleSubmit}
            className={"bg-[#995224]  w-[200px] rounded-md"}
          />
        </div>
      </div>
    </Modal>
  );
};

export default AddOrganization;

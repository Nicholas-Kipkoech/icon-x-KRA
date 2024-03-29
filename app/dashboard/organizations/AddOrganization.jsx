import React, { useState } from "react";
import { Modal } from "antd";
import CustomInput from "@/app/ui/reusableComponents/CustomInput";
import CustomButton from "@/app/ui/reusableComponents/CustomButton";
import { useCustomToast } from "@/app/hooks/useToast";
import { createOrganization } from "@/app/services/adminServices";

const AddOrganization = ({ open, handleClose }) => {
  const [checked, setChecked] = useState("business");
  const [organizationName, setOrganizationName] = useState("");
  const [loading, setLoading] = useState(false);

  const showToast = useCustomToast();

  const handleSubmit = async () => {
    try {
      setLoading(true);
      let formData = new FormData();
      formData.append("organization_name", organizationName);
      formData.append("organization_type", checked);
      await createOrganization(formData);
      setLoading(false);
      showToast("Organization added successfully");
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
      title="Add Organization"
      onCancel={handleClose}
      width={600}
      footer={null}
    >
      <div>
        <CustomInput
          name={"Organization Name"}
          required
          onchange={(e) => setOrganizationName(e.target.value)}
          className={"h-[50px] p-[5px] rounded-md border border-[#995224]"}
        />
        <p className="mt-2">Type of Organization</p>
        <div className="flex gap-2 mt-2">
          <div className="flex gap-2">
            <input
              type="radio"
              id="business"
              name="organizationType"
              value="business"
              checked={checked === "business"}
              onChange={handleRadioChange}
            />
            <label htmlFor="personal">Business</label>
          </div>
          <div className="flex gap-2">
            <input
              type="radio"
              id="group"
              name="organizationType"
              value="group"
              checked={checked === "group"}
              onChange={handleRadioChange}
            />
            <label htmlFor="business">Group</label>
          </div>
        </div>

        <div className="flex justify-center gap-[3rem] mt-[2rem] text-white">
          <CustomButton
            name={"Cancel"}
            onClick={handleClose}
            className={"bg-[#092332] h-[40px] w-[200px] rounded-md"}
          />
          <CustomButton
            name={loading ? "Adding Organization..." : "Add Organization"}
            disabled={loading || organizationName === ""}
            onClick={handleSubmit}
            className={"bg-[#995224]  w-[200px] rounded-md"}
          />
        </div>
      </div>
    </Modal>
  );
};

export default AddOrganization;

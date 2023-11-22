import React, { useEffect, useState } from "react";
import { Modal, Select } from "antd";
import CustomInput from "@/app/ui/reusableComponents/CustomInput";
import CustomButton from "@/app/ui/reusableComponents/CustomButton";
import { createCompany } from "@/app/services/adminServices";
import { useCustomToast } from "@/app/hooks/useToast";

const AddCompany = ({ handleClose, isOpen, onCompanySaved }) => {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [logo, setLogo] = useState("");
  const [status, setStatus] = useState("");
  const [email, setEmail] = useState("");
  const [adminsInput, setAdminsInput] = useState([]);

  const [loading, setLoading] = useState(false);
  const showToast = useCustomToast();
  const handleCreateCompany = async () => {
    try {
      if (name === "" || code === "" || email === "" || adminsInput === "") {
        showToast("All fields should not be empty!!!", "error");
        return;
      }

      const adminsArray = adminsInput.split(",").map((admin) => admin.trim());

      if (adminsArray.length === 0) {
        showToast("Please enter at least one admin email", "error");
        return;
      }

      setLoading(true);
      let formData = new FormData();
      formData.append("company_name", name);
      formData.append("company_code", code);
      formData.append("logo_url", logo);
      formData.append("company_email", email);
      formData.append("status", status);
      // Append each admin email individually
      adminsArray.forEach((adminEmail) => {
        formData.append("admins[]", adminEmail);
      });

      await createCompany(formData);

      onCompanySaved();

      setLoading(false);
      showToast("Company created successfully!!");
      handleClose();
    } catch (error) {
      showToast("Something went wrong!!!", "error", error?.message);
    }
  };

  const options = [
    {
      label: "Active",
      value: "Active",
    },
    {
      label: "Inactive",
      value: "Inactive",
    },
  ];

  return (
    <Modal
      style={{ margin: "0 0", padding: "0 0" }}
      open={isOpen}
      width={600}
      centered
      footer={null}
      onCancel={handleClose}
      title={"Add Company"}
    >
      <form>
        <CustomInput
          name={"Company Name"}
          placeholder={`Enter company's name`}
          className={"h-[50px] border rounded-md p-2"}
          value={name}
          onchange={(e) => setName(e.target.value)}
        />
        <CustomInput
          name={"Company Code"}
          type={"text"}
          placeholder={`Enter company's code`}
          className={"h-[50px] border rounded-md p-2"}
          value={code}
          onchange={(e) => setCode(e.target.value)}
        />
        <CustomInput
          name={"Logo Url"}
          type={"text"}
          placeholder={`Enter logo's url`}
          className={"h-[50px] border rounded-md p-2"}
          value={logo}
          onchange={(e) => setLogo(e.target.value)}
        />
        <div className="mt-3">
          <label htmlFor="company">Company Status</label>
          <Select
            showSearch
            placeholder="select status.. (active or inactive)"
            className="w-[100%] h-[50px]"
            id="company"
            options={options}
            onChange={(value) => setStatus(value)}
          />
        </div>
        <CustomInput
          name={"Company Email"}
          placeholder={`Enter company's email`}
          className={"h-[50px] border rounded-md p-2"}
          value={email}
          onchange={(e) => setEmail(e.target.value)}
        />

        <CustomInput
          name={"Company Admins"}
          placeholder={`Enter company's admins`}
          className={"h-[50px] border rounded-md p-2"}
          value={adminsInput}
          onchange={(e) => setAdminsInput(e.target.value)}
        />

        <div className="mt-6 flex justify-evenly">
          <CustomButton
            name="Cancel"
            className={
              "bg-red-500 p-3 w-[150px] rounded-md text-white text-[16px] font-[700]"
            }
            onClick={handleClose}
          />{" "}
          <CustomButton
            name={loading ? `Saving..` : `Save`}
            disabled={loading}
            onClick={handleCreateCompany}
            type={"button"}
            className={
              "bg-green-500 p-3 w-[150px] rounded-md text-white font-[700] text-[16px]"
            }
          />
        </div>
      </form>
    </Modal>
  );
};

export default AddCompany;

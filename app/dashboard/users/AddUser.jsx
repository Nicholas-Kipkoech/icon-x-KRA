import React, { useEffect, useState } from "react";
import { Modal, Select } from "antd";
import CustomInput from "@/app/ui/reusableComponents/CustomInput";
import CustomButton from "@/app/ui/reusableComponents/CustomButton";
import {
  createCompanyUser,
  fetchCompanies,
} from "@/app/services/adminServices";
import { useCustomToast } from "@/app/hooks/useToast";

const AddUser = ({ handleClose, isOpen, onUserSaved }) => {
  const [companies, setCompanies] = useState([]);
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    const data = await fetchCompanies();
    setCompanies(data?.companies);
  };
  const showToast = useCustomToast();
  useEffect(() => {
    fetchData();
  }, []);
  const handleCreateCompany = async () => {
    try {
      if (name === "" || password === "" || company === "" || email === "") {
        showToast("All fields should not be empty!!!", "error");
      }
      setLoading(true);
      let formData = new FormData();
      formData.append("name", name);
      formData.append("password", password);
      formData.append("email", email);
      formData.append("company", company);
      await createCompanyUser(formData);

      onUserSaved();

      setLoading(false);
      showToast("User created successfully!!");
      handleClose();
    } catch (error) {
      showToast("Something went wrong!!!", "error");
    }
  };

  const options = companies.map((company) => {
    return {
      label: (company?.company_name).toUpperCase(),
      value: company?._id,
    };
  });

  return (
    <Modal
      style={{ margin: "0 0", padding: "0 0" }}
      open={isOpen}
      width={600}
      centered
      footer={null}
      onCancel={handleClose}
    >
      <form>
        <CustomInput
          name={"Name"}
          placeholder={`Enter user's name`}
          className={"h-[50px] border rounded-md p-2"}
          value={name}
          onchange={(e) => setName(e.target.value)}
        />
        <CustomInput
          name={"Email"}
          type={"email"}
          placeholder={`Enter user's email`}
          className={"h-[50px] border rounded-md p-2"}
          value={email}
          onchange={(e) => setEmail(e.target.value)}
        />
        <CustomInput
          name={"Password"}
          placeholder={`Enter user's password`}
          className={"h-[50px] border rounded-md p-2"}
          value={password}
          onchange={(e) => setPassword(e.target.value)}
        />
        <div className="mt-3">
          <label htmlFor="company">Company</label>
          <Select
            className="w-[100%] h-[50px]"
            id="company"
            options={options}
            onChange={(value) => setCompany(value)}
          />
        </div>

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

export default AddUser;

import React, { useEffect, useState } from "react";
import { Modal, Select } from "antd";
import CustomInput from "@/app/ui/reusableComponents/CustomInput";
import CustomButton from "@/app/ui/reusableComponents/CustomButton";
import {
  createCompanyUser,
  fetchCompanies,
  updateCompanyUser,
} from "@/app/services/adminServices";
import { useCustomToast } from "@/app/hooks/useToast";

const AddUser = ({ handleClose, isOpen, onUserSaved, mode, editData }) => {
  const [companies, setCompanies] = useState([]);
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState("");

  useEffect(() => {
    if (mode === "edit") {
      setName(editData?.name);
      setId(editData?._id);
      setPassword(editData?.password);
      setEmail(editData?.email);
      setCompany(editData?.company);
    } else {
      setName("");
      setCompany("");
      setEmail("");
      setPassword("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, editData]);

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

  const handleEdit = async () => {
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
      await updateCompanyUser(id, formData);

      onUserSaved();
      setLoading(false);
      showToast("User updated successfully!!");
      handleClose();
    } catch (error) {
      showToast("Something went wrong!!!", "error");
    }
  };

  const handleSaveCompanyUser = async () => {
    if (mode === "edit") {
      await handleEdit();
    } else {
      await handleCreateCompany();
    }
  };

  const fetchData = async () => {
    const data = await fetchCompanies();
    setCompanies(data?.companies);
  };
  const showToast = useCustomToast();
  useEffect(() => {
    fetchData();
  }, []);
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
      title={mode === "create" ? "Add User" : "Update User"}
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
        {mode === "edit" ? (
          <></>
        ) : (
          <CustomInput
            name={"Password"}
            placeholder={`Enter user's password`}
            className={"h-[50px] border rounded-md p-2"}
            value={password}
            onchange={(e) => setPassword(e.target.value)}
          />
        )}
        <div className="mt-3">
          <label htmlFor="company">Company</label>
          <Select
            showSearch
            placeholder="select company.."
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
            onClick={handleSaveCompanyUser}
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

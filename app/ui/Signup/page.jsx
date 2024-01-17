"use client";
import React, { useEffect, useState } from "react";
import CustomInput from "../reusableComponents/CustomInput";
import CustomButton from "../reusableComponents/CustomButton";
import { useCustomToast } from "@/app/hooks/useToast";
import { Select } from "antd";
import {
  createOrganization,
  fetchClasses,
  fetchFamilies,
  fetchSegments,
} from "@/app/services/adminServices";
import axios from "axios";
import { ENDPOINT } from "@/app/services/axiosUtility";

const Signup = ({ toggleView }) => {
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [segment, setSegment] = useState([]);
  const [family, setFamily] = useState([]);
  const [classes, setClasses] = useState([]);
  const [selectedSegment, setSelectedSegment] = useState("");
  const [selectedFamily, setSelectedFamily] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [organizationName, setOrganizationName] = useState("");
  const [organizationEmail, setOrganizationEmail] = useState("");
  const [organizationPhone, setOrganizationPhone] = useState("");
  const [classesOptions, setClassesOptions] = useState([]);
  const [segmentOptions, setSegmentOptions] = useState([]);
  const [familyOptions, setFamilyOptions] = useState([]);

  const showToast = useCustomToast();

  const getSegments = async () => {
    try {
      setLoading(true);
      const { segments } = await fetchSegments();
      console.log("Segments Response:", segments);
      setSegment(segments);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching segments:", error);
    }
  };

  const getFamilies = async (code) => {
    try {
      setLoading(true);
      const { families } = await fetchFamilies(code);
      setFamily(families);
      setLoading(false);
    } catch (error) {
      setLoading(false);

      console.error("error fetching families...", error);
    }
  };

  const getClasses = async (code) => {
    try {
      setLoading(true);
      const { classes } = await fetchClasses(code);
      setClasses(classes);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching classes..", error);
    }
  };

  useEffect(() => {
    if (selectedSegment !== "") {
      getFamilies(selectedSegment);
    }
  }, [selectedSegment]);

  useEffect(() => {
    if (selectedFamily !== "") {
      getClasses(selectedFamily);
    }
  }, [selectedFamily]);

  useEffect(() => {
    // Update familyOptions when family state changes
    setFamilyOptions(
      family.map((fam) => ({
        label: fam?.family_name,
        value: fam?.family_code,
      }))
    );
  }, [family]);

  useEffect(() => {
    // Update segmentOptions when segment state changes
    setSegmentOptions(
      segment.map((seg) => ({
        label: seg?.segment_name,
        value: seg?.segment_code,
      }))
    );
  }, [segment]);

  useEffect(() => {
    // Update classesOptions when classes state changes
    setClassesOptions(
      classes.map((_class) => ({
        label: _class?.class_name,
        value: _class?.class_code,
      }))
    );
  }, [classes]);

  useEffect(() => {
    getSegments();
  }, []);

  const handleCreateOrg = async () => {
    try {
      setSubmitting(true);
      await axios.post(`${ENDPOINT}/organization/create`, {
        organization_name: organizationName,
        organization_email: organizationEmail,
        organization_phone: organizationPhone,
        business_class: selectedClass,
        business_segment: selectedSegment,
        business_family: selectedFamily,
      });
      setSubmitting(false);
      showToast(
        "Account created successfully credentials has been sent to your email!"
      );
      toggleView();
    } catch (error) {
      showToast(error.response.data.error, "error");
      setSubmitting(false);
      console.error("error", error.response.data.error);
    }
  };

  return (
    <div className="h-[600px] border-2 rounded-md w-[1000px] bg-white">
      <div className="flex flex-col justify-center items-center pt-8">
        <p className="text-[28px] font-bold">Create your account</p>
        <div className="flex flex-col items-center justify-center text-[grey]">
          <p>Enter your details below to create your account and get started</p>
        </div>
      </div>
      <form className="h-[500px] mt-2 p-5 flex flex-col items-center justify-center">
        <div className="flex gap-2  flex-wrap items-center justify-center">
          <CustomInput
            name={`Organization Name`}
            required
            onchange={(e) => setOrganizationName(e.target.value)}
            type={`text`}
            className={`h-[50px] w-[350px] border p-5 rounded-md`}
          />
          <CustomInput
            required
            name={`Organization Email`}
            type={`text`}
            onchange={(e) => setOrganizationEmail(e.target.value)}
            className={`h-[50px] w-[350px] border p-5 rounded-md`}
          />{" "}
          <CustomInput
            required
            name={`Organization Phone`}
            onchange={(e) => setOrganizationPhone(e.target.value)}
            type={`text`}
            className={`h-[50px] w-[350px] border p-5 rounded-md`}
          />{" "}
          <div className="flex flex-col">
            <label>Segment</label>
            <Select
              className="h-[50px] w-[350px]  rounded-md"
              options={segmentOptions}
              placeholder={loading ? "Loading segments" : "Select segment..."}
              defaultValue={segmentOptions[0]?.value}
              onChange={(value) => setSelectedSegment(value)}
            />
          </div>
          <div className="flex flex-col">
            <label>Family of Business</label>
            <Select
              className="h-[50px] w-[350px]  rounded-md"
              placeholder={loading ? "Loading families" : "Select families..."}
              options={familyOptions}
              onChange={(value) => setSelectedFamily(value)}
            />
          </div>
          <div className="flex flex-col">
            <label>Class of Business</label>
            <Select
              className="h-[50px] w-[350px]  rounded-md"
              options={classesOptions}
              placeholder={loading ? "Loading classes" : "Select classes..."}
              onChange={(value) => setSelectedClass(value)}
            />
          </div>
        </div>
        <div className="mt-10 flex gap-2">
          <CustomButton
            name={"Cancel"}
            type={`button`}
            className={`h-[50px] w-[350px] rounded-md bg-[#094b6a] font-[600] text-white text-[20px]`}
            onClick={toggleView}
          />
          <CustomButton
            name={submitting ? `Creating...` : `Create`}
            type={`button`}
            onClick={handleCreateOrg}
            className={`h-[50px] w-[350px] rounded-md bg-[#cb7529] font-[600] text-[white] text-[20px]`}
          />
        </div>
      </form>
    </div>
  );
};

export default Signup;

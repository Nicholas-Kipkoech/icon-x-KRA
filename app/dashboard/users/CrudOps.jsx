"use client";
import {
  fetchClass,
  fetchFamily,
  fetchSegment,
} from "@/app/services/adminServices";
import React, { useEffect, useState } from "react";
import { Spin } from "antd";

export const Family = ({ family_code }) => {
  const [family, setFamily] = useState([]);
  const getFamily = async (code) => {
    const { family } = await fetchFamily(code);
    setFamily(family);
  };
  useEffect(() => {
    getFamily(family_code);
  }, [family_code]);

  return (
    <div>
      {family?.family_name ? family?.family_name : <Spin delay={500} />}
    </div>
  );
};

export const Class = ({ class_code }) => {
  const [_class, setClass] = useState([]);
  const getClass = async (code) => {
    const { _class } = await fetchClass(code);
    setClass(_class);
  };
  useEffect(() => {
    getClass(class_code);
  }, [class_code]);

  return (
    <div className="text-ellipsis overflow-hidden">
      {_class?.class_name ? _class?.class_name : <Spin delay={500} />}
    </div>
  );
};
export const Segment = ({ segment_code }) => {
  const [segment, setSegment] = useState([]);
  const getSegment = async (code) => {
    const { segment } = await fetchSegment(code);
    setSegment(segment);
  };
  console.log(segment);
  useEffect(() => {
    getSegment(segment_code);
  }, [segment_code]);

  return (
    <div>
      {segment?.segment_name ? segment?.segment_name : <Spin delay={500} />}
    </div>
  );
};

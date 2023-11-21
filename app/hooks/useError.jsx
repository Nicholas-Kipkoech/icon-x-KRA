"use client";
import { useCustomToast } from "./useToast";

const useError = () => {
  const showToast = useCustomToast();
  const handleError = (e) => {
    console.log("ERROR: ", JSON.stringify(e?.response));
    if (e?.response?.data) {
      if (e?.response?.data?.message) {
        return showToast(
          `Request not successful. ${e?.response?.data?.message}`,
          "error"
        );
      }
      const response = e.response.data;
      const errors = response[Object.keys(response)[0]];
      if (errors?.length > 0 && errors !== "<") {
        if (Array?.isArray(errors)) {
          errors.map((err) => showToast(`${err}`, "error"));
        } else {
          showToast(`Request not successful. ${errors}`, "error");
        }
      } else {
        showToast(` ${e?.message}`, "error");
      }
    } else {
      showToast(`${e?.message}`, "error");
    }
  };

  return handleError;
};

export default useError;

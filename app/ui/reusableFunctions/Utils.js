import {
  fetchClass,
  fetchFamily,
  fetchSegment,
} from "@/app/services/adminServices";

export const formatDateToCustomFormat = (selectedDate) => {
  if (selectedDate) {
    const date = new Date(selectedDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    const formattedDate = `${year}${month}${day}${hours}${minutes}${seconds}`;
    return formattedDate;
  } else {
    return "";
  }
};

export const formatDate = (serverTime) => {
  const date = new Date(serverTime);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  const formattedDate = `${day}/${month}/${year}`;
  return formattedDate;
};

export const getFamily = async (code) => {
  const { family } = await fetchFamily(code);
  return family;
};
export const getClass = async (code) => {
  const { _class } = await fetchClass(code);
  return _class;
};
export const getSegment = async (code) => {
  const { segment } = await fetchSegment(code);
  return segment;
};

export const convertToShortScaleFormat = (number) => {
  if (typeof number !== "number" || isNaN(number)) {
    return "Invalid input";
  }
  if (number < 1000) {
    return number.toString();
  }
  if (number < 1000000) {
    const thousandValue = Math.floor(number / 1000);
    const remainder = number % 1000;

    if (remainder === 0) {
      return thousandValue + " Thousand";
    }

    return thousandValue + "." + remainder.toString().slice(0, 1) + " Thousand";
  }
  const millionValue = Math.floor(number / 1000000);
  const remainder = number % 1000000;

  if (remainder === 0) {
    return millionValue + " Million";
  }
  return millionValue + "." + remainder.toString().slice(0, 1) + " Million";
};

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

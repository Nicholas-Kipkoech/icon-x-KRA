import { PrivateAxiosUtility } from "./axiosUtility";

export const initializeDevice = async (data) => {
  const res = await PrivateAxiosUtility.post(`/etims/initialize`, data);
  return res?.data;
};
export const lookupListCodeFunc = async (data) => {
  const res = await PrivateAxiosUtility.post(`/etims/selectCodeList`, data);
  return res?.data;
};
export const lookupItemClassFunc = async (data) => {
  const res = await PrivateAxiosUtility.post(`/etims/selectItemClsList`, data);
  return res?.data;
};
export const fetchCustomerInfo = async (data) => {
  const res = await PrivateAxiosUtility.post(`/etims/selectCustomer`, data);
  return res?.data;
};
export const fetchBranchLists = async (data) => {
  const res = await PrivateAxiosUtility.post(`/etims/selectBhfList`, data);
  return res?.data;
};

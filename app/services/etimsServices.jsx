import { PrivateAxiosUtility } from "./axiosUtility";
//1
export const initializeDevice = async (data) => {
  const res = await PrivateAxiosUtility.post(`/etims/initialize`, data);
  return res?.data;
};
//2
export const lookupListCodeFunc = async (data) => {
  const res = await PrivateAxiosUtility.post(`/etims/selectCodeList`, data);
  return res?.data;
};
//3
export const lookupItemClassFunc = async (data) => {
  const res = await PrivateAxiosUtility.post(`/etims/selectItemClsList`, data);
  return res?.data;
};
//4
export const fetchCustomerInfo = async (data) => {
  const res = await PrivateAxiosUtility.post(`/etims/selectCustomer`, data);
  return res?.data;
};
//5
export const fetchBranchLists = async (data) => {
  const res = await PrivateAxiosUtility.post(`/etims/selectBhfList`, data);
  return res?.data;
};
//6
export const fetchNoticeLists = async (data) => {
  const res = await PrivateAxiosUtility.post(`/etims/selectNoticeList`, data);
  return res?.data;
};
//7
export const saveCustomerToBranch = async (data) => {
  const res = await PrivateAxiosUtility.post(`/etims/saveBhfCustomer`, data);
  return res?.data;
};
//8
export const saveUserToBranch = async (data) => {
  const res = await PrivateAxiosUtility.post(`/etims/saveBhfUser`, data);
  return res?.data;
};
//9
export const saveBranchInsurance = async (data) => {
  const res = await PrivateAxiosUtility.post(`/etims/saveBhfInsurance`, data);
  return res?.data;
};
//10
export const saveItemReq = async (data) => {
  const res = await PrivateAxiosUtility.post(`/etims/saveItem`, data);
  return res?.data;
};
export const saveItemCompositionReq = async (data) => {
  const res = await PrivateAxiosUtility.post(
    `/etims/saveItemComposition`,
    data
  );
  return res?.data;
};
export const fetchImportedList = async (data) => {
  const res = await PrivateAxiosUtility.post(
    `/etims/selectImportItemList`,
    data
  );
  return res?.data;
};
export const updateImportItemReq = async (data) => {
  const res = await PrivateAxiosUtility.post(`/etims/updateImportItem`, data);
  return res?.data;
};
export const fetchPurchaseList = async (data) => {
  const res = await PrivateAxiosUtility.post(
    `/etims/selectTrnsPurchaseSalesList`,
    data
  );
  return res?.data;
};
export const savePurchaseInfoReq = async (data) => {
  const res = await PrivateAxiosUtility.post(`/etims/insertTrnsPurchase`, data);
  return res?.data;
};
export const saveStockMasterReq = async (data) => {
  const res = await PrivateAxiosUtility.post(`/etims/saveStockMaster`, data);
  return res?.data;
};
export const fetchStockMaster = async (data) => {
  const res = await PrivateAxiosUtility.post(
    `/etims/selectStockMoveList`,
    data
  );
  return res?.data;
};
export const insertStockIO = async (data) => {
  const res = await PrivateAxiosUtility.post(`/etims/insertStockIO`, data);
  return res?.data;
};
export const fetchItemList = async (data) => {
  const res = await PrivateAxiosUtility.post(`/etims/selectItemList`, data);
  return res?.data;
};

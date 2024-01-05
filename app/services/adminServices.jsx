import { PrivateAxiosUtility } from "./axiosUtility";

export const updateUser = async (data) => {
  const res = await PrivateAxiosUtility.patch(`/user/update`, data);
  return res?.data;
};

export const fetchTransactions = async () => {
  const res = await PrivateAxiosUtility.get(`/etims/fetch-transactions`);
  return res.data;
};
export const addTransaction = async (data) => {
  const res = await PrivateAxiosUtility.post(`/etims/saveTrnsSalesOsdc`, data);
  return res.data;
};

export const fetchItemInfo = async () => {
  const res = await PrivateAxiosUtility.post(`/etims/selectItemClsList`, {
    lastReqDt: "20190524000000",
  });
  return res.data;
};
export const fetchTransactionsById = async (id) => {
  const res = await PrivateAxiosUtility.get(`/etims/fetch-transactions/${id}`);
  return res.data;
};

export const fetchSegments = async () => {
  const res = await PrivateAxiosUtility.get(`/organization/fetch/segment`);
  return res.data;
};

export const fetchClasses = async (code) => {
  const res = await PrivateAxiosUtility.get(
    `/organization/fetch/classes/${code}`
  );
  return res.data;
};

export const fetchFamilies = async (code) => {
  const res = await PrivateAxiosUtility.get(
    `/organization/fetch/family/${code}`
  );
  return res.data;
};

export const createOrganization = async (data) => {
  const res = await PrivateAxiosUtility.post(`/organization/create`, data);
  return res.data;
};
export const fetchComodities = async (code) => {
  const res = await PrivateAxiosUtility.get(
    `/organization/fetch/comodities/${code}`
  );
  return res.data;
};

import { PrivateAxiosUtility } from "./axiosUtility";

export const fetchCompanyUsers = async () => {
  const res = await PrivateAxiosUtility.get(`/user/companyUsers/fetch`);
  return res?.data;
};

export const updateUser = async (data) => {
  const res = await PrivateAxiosUtility.patch(`/user/update`, data);
  return res?.data;
};

export const fetchCompanies = async () => {
  const res = await PrivateAxiosUtility.get(`/company/fetch`);
  return res?.data;
};

export const createCompanyUser = async (data) => {
  const res = await PrivateAxiosUtility.post(`/user/company/create`, data);
  return res?.data;
};
export const createCompany = async (data) => {
  const res = await PrivateAxiosUtility.post(`/company/create`, data);
  return res?.data;
};

export const fetchCompanyById = async (id) => {
  const res = await PrivateAxiosUtility.get(`/company/fetch/${id}`);
  return res?.data;
};

export const updateCompanyUser = async (id, data) => {
  const res = await PrivateAxiosUtility.patch(
    `/user/company/update/${id}`,
    data
  );
  return res?.data;
};
export const updateCompany = async (id, data) => {
  const res = await PrivateAxiosUtility.patch(`/company/update/${id}`, data);
  return res?.data;
};
export const deleteCompanyUser = async (id) => {
  const res = await PrivateAxiosUtility.delete(`/user/company/delete/${id}`);
  return res?.data;
};
export const deleteCompany = async (id) => {
  const res = await PrivateAxiosUtility.delete(`/company/delete/${id}`);
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

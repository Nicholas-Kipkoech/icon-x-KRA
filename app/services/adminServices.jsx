import { PrivateAxiosUtility } from "./axiosUtility";

export const createUser = async (data) => {
  const res = await PrivateAxiosUtility.post(`/user/create`, data);
  return res?.data;
};

export const updateUser = async (data) => {
  const res = await PrivateAxiosUtility.patch(`/user/password/update`, data);
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

export const fetchTransactionsById = async (id) => {
  const res = await PrivateAxiosUtility.get(`/etims/fetch-transactions/${id}`);
  return res.data;
};

export const createOrganization = async (data) => {
  const res = await PrivateAxiosUtility.post(`/organization/create`, data);
  return res.data;
};

export const createBusiness = async (data) => {
  const res = await PrivateAxiosUtility.post(`/business/create`, data);
  return res.data;
};

export const fetchOrganizations = async () => {
  const res = await PrivateAxiosUtility.get(`/organization/fetch`);
  return res.data;
};

export const updateSuperAdmin = async (email, data) => {
  const res = await PrivateAxiosUtility.patch(
    `/user/superadmin/update/${email}`,
    data
  );
  return res.data;
};

export const fetchBusinessByOrganization = async (id) => {
  const res = await PrivateAxiosUtility.get(`/business/fetch/${id}`);
  return res.data;
};

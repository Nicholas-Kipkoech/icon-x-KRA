import { PrivateAxiosUtility } from "./axiosUtility";

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

export const AddFamilyRequest = async (data) => {
  const res = await PrivateAxiosUtility.post(`/organization/add/family`, data);
  return res.data;
};

export const createOrganization = async (data) => {
  const res = await PrivateAxiosUtility.post(`/organization/create`, data);
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

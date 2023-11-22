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

export const fetchCompanyById = async (id) => {
  const res = await PrivateAxiosUtility.get(`/company/fetch/${id}`);
  return res?.data;
};

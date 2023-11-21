import { PrivateAxiosUtility } from "./axiosUtility";

export const fetchCompanyUsers = async () => {
  const res = await PrivateAxiosUtility.get(`/company/fetch/users`);
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

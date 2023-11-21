import { PrivateAxiosUtility } from "./axiosUtility";

export const fetchCompanyUsers = async () => {
  const res = await PrivateAxiosUtility.get(`/company/fetch/users`);
  return res?.data;
};

export const updateUser = async (data) => {
  const res = await PrivateAxiosUtility.patch(`/user/update`, data);
  return res?.data;
};

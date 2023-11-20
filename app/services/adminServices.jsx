import { PrivateAxiosUtility } from "./axiosUtility";

export const fetchCompanyUsers = async () => {
  const res = await PrivateAxiosUtility.get(`/company/fetch/users`);
  return res?.data;
};

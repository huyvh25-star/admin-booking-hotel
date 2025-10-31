import axiosClient from "./axiosClient";
export const authApi = {
  register: (data) => axiosClient.post("/auth/register", data),
  login: (data) => axiosClient.post("/auth/login", data),
  update: (id, data) => {
    return axiosClient.put(`/auth/${id}/update`, data);
  },
};
export default authApi;

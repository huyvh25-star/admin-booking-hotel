import axiosClient from "./axiosClient";
export const authApi = {
  register: (data) => axiosClient.post("/auth/register", data),
  login: (data) => axiosClient.post("/auth/login", data),
  forgotPassword: (data) => axiosClient.post("/auth/forgot-password", data),
  update: (id, data) => {
    return axiosClient.put(`/auth/${id}/update`, data);
  },
};
export default authApi;

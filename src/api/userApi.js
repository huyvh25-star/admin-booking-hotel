import axiosClient from "./axiosClient";

const userApi = {
  getAll: (params) => axiosClient.get("/users", { params }),
};

export default userApi;

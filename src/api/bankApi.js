import axiosClient from "./axiosClient";
const bankApi = {
  getAll: () => axiosClient.get("/banks"),
  create: (data) => axiosClient.post("/banks", data),
  update: (id, data) => axiosClient.put(`/banks/${id}`, data),
  remove: (id) => axiosClient.delete(`banks/${id}`),
  updateStatus: (id) => axiosClient.patch(`/banks/${id}/status`),
};

export default bankApi;

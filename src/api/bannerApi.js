import axiosClient from "./axiosClient";

const bannerApi = {
  getAll: (params) => axiosClient.get("/banners", { params }),
  updateStatus: (id) => axiosClient.put(`/banners/${id}/status`),
  add: (data) => axiosClient.post("/banners", data),
};

export default bannerApi;

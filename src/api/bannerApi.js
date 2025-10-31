import axiosClient from "./axiosClient";

const bannerApi = {
  getAll: () => axiosClient.get("/banners"),
  updateStatus: (id) => axiosClient.put(`/banners/${id}/status`),
  add: (data) => axiosClient.post("/banners", data),
};

export default bannerApi;

import axiosClient from "./axiosClient";

const hotelApi = {
  getAll: (params) => axiosClient.get("/hotels", { params }),
  getById: (id) => axiosClient.get(`/hotels/${id}`),
  add: (data) => axiosClient.post("/hotels", data),
  update: (id, data) => axiosClient.put(`/hotels/${id}`, data),
  delete: (id) => axiosClient.delete(`/hotels/${id}`),
};

export default hotelApi;

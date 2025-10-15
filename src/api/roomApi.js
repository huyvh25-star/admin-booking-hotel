import axiosClient from "./axiosClient";

const roomApi = {
  getAll: (id) => axiosClient.get(`/rooms/hotel/${id}`),
  getById: (id) => axiosClient.get(`/rooms/${id}`),
  add: (data) => axiosClient.post("/rooms", data),
  update: (id, data) => axiosClient.put(`/rooms/${id}`, data),
  delete: (id) => axiosClient.delete(`/rooms/${id}`),
};

export default roomApi;

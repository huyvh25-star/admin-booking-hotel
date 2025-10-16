import axiosClient from "./axiosClient";

const roomImageApi = {
  getAll: (id) => axiosClient.get(`/room-image?id=${id}`),
  add: async (data) => axiosClient.post("/room-image", data),
};

export default roomImageApi;

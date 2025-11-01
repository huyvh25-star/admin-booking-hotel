import axiosClient from "./axiosClient";

const billApi = {
  // 🧾 Lấy danh sách hóa đơn (có phân trang + lọc theo email)
  getAll: (params) => axiosClient.get("/bills", { params }),
  // params có thể gồm: { page: 1, limit: 10, email: "abc@gmail.com" }

  // 🆕 Tạo hóa đơn
  add: (data) => axiosClient.post("/bills", data),

  // 🔄 Cập nhật trạng thái hóa đơn (xác nhận / hủy)
  updateStatus: (id, data) => axiosClient.put(`/bills/${id}/status`, data),
};

export default billApi;

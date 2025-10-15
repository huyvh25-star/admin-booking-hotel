// src/api/axiosClient.js
import axios from "axios";

// Tạo instance axios
const axiosClient = axios.create({
  baseURL: "http://localhost:5000/api", // đổi theo URL backend của bạn
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false, // nếu bạn dùng cookie hoặc auth
});

// 🛠️ Thêm interceptor (xử lý request & response)
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosClient.interceptors.response.use(
  (response) => response.data, // trả về data luôn cho gọn
  (error) => {
    console.error("API Error:", error.response || error.message);
    return Promise.reject(error);
  }
);

export default axiosClient;

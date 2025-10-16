// src/api/axiosClient.js
import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;
// Tạo instance axios
const axiosClient = axios.create({
  baseURL: apiUrl, 
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false, 
});

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

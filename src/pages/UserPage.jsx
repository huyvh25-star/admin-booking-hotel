import { useEffect, useState } from "react";
import { toast } from "sonner";
import authApi from "../api/authApi";

const UserPage = () => {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    avatar: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const adminData = localStorage.getItem("admin");
    if (adminData) {
      const parsed = JSON.parse(adminData);
      setUser(parsed);
      setFormData({
        name: parsed.name || "",
        email: parsed.email || "",
        password: "",
        avatar: parsed.avatar || "default-avatar.png",
      });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      // gọi API
      const res = await authApi.update(user._id, formData);

      // Debug: in ra để bạn biết server trả gì (xem console)
      console.log("Raw response from authApi.update:", res);

      // Chuẩn hoá payload:
      // res có thể là: axiosResponse (-> res.data), hoặc object đã unwrap (-> res)
      const payload = res?.data ?? res; // nếu axios, payload = res.data ; else payload = res
      console.log("Normalized payload:", payload);

      // Dữ liệu user có thể nằm ở payload.data (thường) hoặc payload trực tiếp
      const updatedUser = payload?.data ?? payload;
      const message = payload?.message || "Cập nhật thành công!";

      if (!updatedUser || !updatedUser._id) {
        // Nếu server không trả user hợp lệ thì thông báo lỗi nhưng KHÔNG ném throw
        console.warn("Invalid response shape — missing updated user", payload);
        toast.error(
          payload?.message ||
            "Server trả dữ liệu không hợp lệ. Kiểm tra console."
        );
        return; // thoát, loading sẽ tắt ở finally
      }

      // Thành công — cập nhật localStorage + state
      toast.success(message);
      localStorage.setItem("admin", JSON.stringify(updatedUser));
      setUser(updatedUser);
      setFormData((prev) => ({ ...prev, password: "" }));
    } catch (err) {
      console.error("API Error:", err);
      // hiển thị thông điệp phù hợp: ưu tiên message từ server, nếu không có dùng err.message
      const serverMsg =
        err?.response?.data?.message ?? err?.message ?? "Cập nhật thất bại!";
      toast.error(serverMsg);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center py-10 bg-base-200 min-h-screen">
      <div className="card w-full max-w-md shadow-xl bg-white p-6">
        <h2 className="text-2xl font-bold text-center mb-6 text-primary">
          Cập Nhật Thông Tin Người Dùng
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label">
              <span className="label-text font-medium">Họ và tên</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text font-medium">Email</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text font-medium">Mật khẩu mới</span>
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Để trống nếu không đổi"
              className="input input-bordered w-full"
            />
          </div>

          <button
            type="submit"
            className={`btn btn-primary w-full ${loading ? "loading" : ""}`}
            disabled={loading}
          >
            {loading ? "Đang cập nhật..." : "Cập nhật thông tin"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserPage;

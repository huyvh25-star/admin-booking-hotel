import { useEffect, useState } from "react";
import { Eye, EyeOff, LogIn, Mail } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { authApi } from "../api/authApi";

const LoginPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  const [loading, setLoading] = useState(false);
  const [forgotLoading, setForgotLoading] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [forgotEmail, setForgotEmail] = useState("");

  // ✅ Nếu admin đã đăng nhập thì chuyển hướng
  useEffect(() => {
    const admin = localStorage.getItem("admin");
    if (admin) {
      navigate("/");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // 🔐 Xử lý đăng nhập
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      toast.error("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    try {
      setLoading(true);
      const res = await authApi.login(form);
      // ✅ Lưu thông tin admin vào localStorage
      if (res.data.role === "user") {
        toast.error("tài khoản của bạn không đủ điều kiện truy cập trang này");
        return;
      } else {
        localStorage.setItem("admin", JSON.stringify(res.data));

        toast.success("Đăng nhập thành công!");
        navigate("/");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Đăng nhập thất bại!");
    } finally {
      setLoading(false);
    }
  };

  // ✉️ Xử lý quên mật khẩu
  const handleForgot = async (e) => {
    e.preventDefault();
    if (!forgotEmail) {
      toast.error("Vui lòng nhập email!");
      return;
    }

    setForgotLoading(true);
    try {
      await authApi.forgotPassword({ email: forgotEmail });
      toast.success("Đã gửi mật khẩu tạm qua email!");
      setShowForgot(false);
      setForgotEmail("");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Lỗi khi gửi email!");
    } finally {
      setForgotLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="card w-full max-w-md shadow-2xl bg-base-100">
        <form onSubmit={handleSubmit} className="card-body">
          <h2 className="text-2xl font-bold text-center mb-4 flex items-center justify-center gap-2">
            <LogIn className="w-6 h-6" /> Đăng nhập quản trị
          </h2>

          {/* Email */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Email</span>
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@gmail.com"
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Password */}
          <div className="form-control relative">
            <label className="label">
              <span className="label-text font-medium">Mật khẩu</span>
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="input input-bordered w-full pr-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-10 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Forgot Password */}
          <div className="text-right mt-2">
            <button
              type="button"
              onClick={() => setShowForgot(true)}
              className="text-sm text-primary hover:underline"
            >
              Quên mật khẩu?
            </button>
          </div>

          {/* Submit */}
          <div className="form-control mt-6">
            <button
              className={`btn btn-primary w-full ${loading ? "loading" : ""}`}
              type="submit"
            >
              {loading ? "Đang đăng nhập..." : "Đăng nhập"}
            </button>
          </div>
        </form>
      </div>

      {/* Modal quên mật khẩu */}
      {showForgot && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-lg w-96 p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Mail className="w-5 h-5" /> Quên mật khẩu
            </h3>
            <p className="text-sm text-gray-500 mb-3">
              Nhập email của bạn để nhận mật khẩu tạm thời.
            </p>
            <form onSubmit={handleForgot}>
              <input
                type="email"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                placeholder="you@gmail.com"
                className="input input-bordered w-full mb-4"
                required
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={() => setShowForgot(false)}
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className={`btn btn-primary ${
                    forgotLoading ? "loading" : ""
                  }`}
                >
                  Gửi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;

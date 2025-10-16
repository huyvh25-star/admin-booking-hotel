import { useState } from "react";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
const LoginPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      toast.error("Vui lòng nhập đầy đủ thông tin!");
      return;
    }
    localStorage.setItem("admin", JSON.stringify(form));

    // Giả lập login (bạn có thể call API ở đây)
    navigate("/");
    toast.success("Đăng nhập thành công!");
    console.log("Login info:", form);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-full max-w-md shadow-2xl bg-base-100">
        <form onSubmit={handleSubmit} className="card-body">
          <h2 className="text-2xl font-bold text-center mb-4 flex items-center justify-center gap-2">
            <LogIn className="w-6 h-6" /> Đăng nhập
          </h2>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Email</span>
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="input input-bordered w-full"
              required
            />
          </div>

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

          <div className="form-control mt-6">
            <button className="btn btn-primary w-full" type="submit">
              Đăng nhập
            </button>
          </div>

          <p className="text-sm text-center mt-3 text-gray-500">
            Chưa có tài khoản?{" "}
            <a href="/register" className="text-primary hover:underline">
              Đăng ký ngay
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;

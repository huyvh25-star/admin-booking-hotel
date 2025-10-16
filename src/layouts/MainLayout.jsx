import { Link, Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const MainLayout = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <div className="bg-white h-screen flex flex-col">
      {/* Header */}
      <header className="flex justify-between items-center border-b-2 border-black h-16 px-4">
        <h1 className="text-lg font-bold">Logo</h1>
        <Link
          to="/login"
          className="border-0 bg-red-500  py-1 px-2 rounded-2xl text-sm font-bold text-white"
        >
          Đăng nhập
        </Link>
      </header>

      {/* Main content chiếm toàn bộ phần còn lại */}
      <main className="flex flex-1">
        {/* Sidebar */}
        <aside className="bg-white w-[300px] text-black p-4 border-r-2 border-black">
          <nav className="flex flex-col gap-4">
            <Link
              to="/"
              className="border-1 border-pink-300 rounded-2xl py-3 text-center hover:bg-pink-400"
            >
              Dash board
            </Link>
            <Link
              className="border-1 border-pink-300 rounded-2xl py-3 text-center hover:bg-pink-400"
              to="/hotel"
            >
              Quản Lý Khách Sạn
            </Link>
            <Link
              className="border-1 border-pink-300 rounded-2xl py-3 text-center hover:bg-pink-400"
              to="/user"
            >
              Quản lý User
            </Link>
            <button
              onClick={handleLogout}
              className="border-1 border-red-300 rounded-2xl py-2 text-center hover:bg-red-400 w-24"
            >
              đăng xuất
            </button>
          </nav>
        </aside>

        {/* Phần nội dung chính */}
        <section className="flex-1 bg-white p-6">
          <Outlet />
        </section>
      </main>
    </div>
  );
};

export default MainLayout;

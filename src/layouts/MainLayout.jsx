import { NavLink, Outlet, useNavigate } from "react-router-dom";

const MainLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  // Tạo danh sách menu
  const menuItems = [
    { name: "Thống Kê", path: "/" },
    { name: "Quản Lý Khách Sạn", path: "/hotel" },
    { name: "Quản Lý Hóa Đơn", path: "/booking" },
    { name: "Quản Lý Người Dùng", path: "/user" },
    { name: "Quản Lý Banner", path: "/banner" },
  ];

  return (
    <div className="bg-gray-50 h-screen flex flex-col">
      {/* Header */}
      <header className="flex justify-between items-center shadow-md bg-white h-16 px-6 border-b">
        <h1 className="text-2xl font-bold text-pink-600">🏨 Admin Panel</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-xl transition"
        >
          Đăng xuất
        </button>
      </header>

      {/* Main */}
      <main className="flex flex-1">
        {/* Sidebar */}
        <aside className="bg-white w-[260px] border-r shadow-sm">
          <nav className="flex flex-col items-start p-4 gap-2">
            {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `py-3 px-4 rounded-xl text-center font-medium transition ${
                    isActive
                      ? "bg-pink-500 text-white shadow-md"
                      : "text-gray-700 hover:bg-pink-100 hover:text-pink-600"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </nav>
        </aside>

        {/* Content */}
        <section className="flex-1 bg-gray-50 p-6 overflow-y-auto">
          <Outlet />
        </section>
      </main>
    </div>
  );
};

export default MainLayout;

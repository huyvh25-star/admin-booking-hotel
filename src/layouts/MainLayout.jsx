import { Link, Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="bg-white h-screen flex flex-col">
      {/* Header */}
      <header className="flex justify-between items-center border-b-2 border-black h-16 px-4">
        <h1 className="text-lg font-bold">Logo</h1>
        <h1>Admin</h1>
      </header>

      {/* Main content chiếm toàn bộ phần còn lại */}
      <main className="flex flex-1">
        {/* Sidebar */}
        <aside className="bg-white w-[300px] text-black p-4 border-r-2 border-black">
          <nav className="flex flex-col gap-4">
            <Link to="/" className="hover:bg-amber-500">
              Dash board
            </Link>
            <Link to="/hotel">hotel</Link>
            <Link to="/room">room</Link>
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

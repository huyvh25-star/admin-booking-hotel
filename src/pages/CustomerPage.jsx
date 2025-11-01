import { useEffect, useState } from "react";
import userApi from "../api/userApi";

const CustomerPage = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // 🧾 Hàm fetch user có phân trang
  const fetchUsers = async (params = {}) => {
    try {
      setLoading(true);
      const res = await userApi.getAll({ page, limit: 10, ...params });
      if (res.code === 200) {
        setUsers(res.data || []);
        setTotalPages(res.pagination?.totalPages || 1);
      }
    } catch (error) {
      console.error("Lỗi khi lấy danh sách user:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Danh Sách Khách Hàng
        </h1>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="flex justify-center items-center flex-1">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      ) : (
        <div className="overflow-x-auto shadow-lg rounded-2xl bg-white">
          <table className="table w-full">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th>#</th>
                <th>Khách hàng</th>
                <th>Email</th>
                <th>Số điện thoại</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((c, i) => (
                  <tr
                    key={c._id}
                    className="hover:bg-gray-50 transition-all border-b"
                  >
                    <td>{(page - 1) * 10 + i + 1}</td>
                    <td>{c.name}</td>
                    <td>{c.email}</td>
                    <td>{c.phone || "—"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-6 text-gray-500">
                    Không có khách hàng nào.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      {!loading && (
        <div className="flex justify-center items-center mt-6 gap-3">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="btn btn-sm btn-outline"
          >
            Trang trước
          </button>
          <span className="text-gray-600 font-medium">
            Trang {page} / {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="btn btn-sm btn-outline"
          >
            Trang sau
          </button>
        </div>
      )}
    </div>
  );
};

export default CustomerPage;

import { Plus, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import billApi from "../api/billApi.js";
import BillList from "../components/Bill/BillList";

const BookingPage = () => {
  const [bills, setBills] = useState([]);
  const [email, setEmail] = useState(""); // lọc email
  const [page, setPage] = useState(1); // phân trang
  const [limit] = useState(3);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  // 🧾 Lấy danh sách hóa đơn
  const fetchBills = async () => {
    try {
      setLoading(true);
      const res = await billApi.getAll({ page, limit, email });
      if (res.code === 200) {
        setBills(res.data);
        setTotalPages(res.pagination?.totalPages || 1);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // 🔁 Gọi API khi page hoặc email thay đổi
  useEffect(() => {
    fetchBills();
  }, [page, email]);

  // 📧 Xử lý thay đổi email
  const handleEmailChange = (e) => {
    setPage(1); // reset về trang đầu khi lọc
    setEmail(e.target.value);
  };

  // 📄 Phân trang
  const handleNext = () => setPage((p) => Math.min(p + 1, totalPages));
  const handlePrev = () => setPage((p) => Math.max(p - 1, 1));
  // Cập nhật trạng thái hóa đơn
  const handleUpdateStatus = async (bill) => {
    const { _id: id, status: newStatus } = bill;

    if (!id || !newStatus) {
      console.error("Thiếu id hoặc status");
      return;
    }

    try {
      setLoading(true);

      // Gửi chỉ status, backend sẽ tự xử lý paymentStatus
      const res = await billApi.updateStatus(id, { status: newStatus });

      if (res.code === 200) {
        const updatedBill = res.data;

        // Cập nhật state với cả status và paymentStatus mới
        setBills((prevBills) =>
          prevBills.map((b) =>
            b._id === id
              ? {
                  ...b,
                  status: updatedBill.status,
                  paymentStatus: updatedBill.paymentStatus, // Cập nhật luôn
                }
              : b
          )
        );

        alert(
          `Đã cập nhật: ${newStatus}${
            newStatus === "confirmed" ? " → Thanh toán: Đã thanh toán" : ""
          }`
        );
      } else {
        alert("Cập nhật thất bại!");
      }
    } catch (error) {
      console.error("Lỗi cập nhật:", error);
      alert("Lỗi khi cập nhật trạng thái");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col p-6 bg-gray-50 min-h-screen">
      {/* 🔖 Tiêu đề */}
      <h1 className="text-3xl font-bold text-center mb-6">Quản Lý Hóa Đơn</h1>

      {/* Thanh công cụ */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-3">
        {/* Ô lọc email */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Lọc theo email người dùng..."
            value={email}
            onChange={handleEmailChange}
            className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
      </div>

      {/* Danh sách hóa đơn */}
      {loading ? (
        <div className="text-center py-10 text-gray-500">Đang tải...</div>
      ) : (
        <BillList bills={bills} handleUpdateStatus={handleUpdateStatus} />
      )}

      {/* Phân trang */}
      <div className="flex justify-center items-center mt-6 gap-3">
        <button
          onClick={handlePrev}
          disabled={page === 1}
          className="p-2 rounded-full border hover:bg-gray-100 disabled:opacity-50"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <span className="text-sm text-gray-600">
          Trang <strong>{page}</strong> / {totalPages}
        </span>

        <button
          onClick={handleNext}
          disabled={page === totalPages}
          className="p-2 rounded-full border hover:bg-gray-100 disabled:opacity-50"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default BookingPage;

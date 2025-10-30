import { Plus } from "lucide-react";
const BookingPage = () => {
  return (
    <div className="flex flex-col">
      {/* 🔖 Tiêu đề */}
      <div className="flex justify-center font-bold text-3xl mt-6">
        <h1>Quản Lý Hóa Đơn</h1>
      </div>
      <div className="flex justify-end">
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 active:scale-95 transition flex items-center">
          <Plus className="w-4 h-4" /> Thêm mới
        </button>
      </div>
    </div>
  );
};

export default BookingPage;

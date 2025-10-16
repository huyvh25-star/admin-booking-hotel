import { useEffect, useState } from "react";
import HotelList from "../components/Hotel/HotelList";
import HotelForm from "../components/Hotel/HotelForm";
import hotelApi from "../api/hotelApi";
import { Plus } from "lucide-react";
const HotelPage = () => {
  const [modal, setModal] = useState(false);
  const [hotels, setHotels] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [search, setSearch] = useState(""); // 🔍 Từ khóa tìm kiếm
  const [page, setPage] = useState(1); // 🔢 Trang hiện tại
  const [pagination, setPagination] = useState({ totalPages: 1, total: 0 }); // 📊 Dữ liệu phân trang
  const [isLoad, setIsLoad] = useState(false);
  // 🧠 Hàm gọi API
  const fetchHotels = async () => {
    try {
      setIsLoad(true);
      const res = await hotelApi.getAll({
        name: search,
        page,
        limit: 5,
      });

      console.log(res);

      if (res?.data) {
        setHotels(res.data || []);
        setPagination(res.pagination || { totalPages: 1, total: 0 });
      }
    } catch (error) {
      console.error("Lỗi khi tải danh sách khách sạn:", error);
      setHotels([]);
      setPagination({ totalPages: 1, total: 0 });
    }
    setIsLoad(false);
  };

  // 🌀 Gọi lại khi thay đổi modal (thêm/sửa), search, page
  useEffect(() => {
    fetchHotels();
  }, [modal, search, page]);

  // ✏️ Sửa hotel
  const handleEdit = (hotel) => {
    setSelectedHotel(hotel);
    setModal(true);
  };

  // ➕ Thêm mới
  const handleAddNew = () => {
    setSelectedHotel(null);
    setModal(true);
  };

  return (
    <div className="flex flex-col">
      {/* 🔖 Tiêu đề */}
      <div className="flex justify-center font-bold text-3xl mt-6">
        <h1>Quản Lý Khách Sạn</h1>
      </div>

      {/* 🔍 Thanh tìm kiếm + nút thêm */}
      <div className="flex justify-between items-center m-4">
        <div className="flex items-center space-x-3">
          <input
            type="text"
            placeholder="Tìm kiếm khách sạn theo tên..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1); // reset trang về đầu khi đổi tìm kiếm
            }}
            className="border border-gray-300 rounded-lg px-3 py-2 w-72 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span className="text-gray-600 text-sm">
            Tổng: {pagination?.total || 0} khách sạn
          </span>
        </div>

        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 active:scale-95 transition flex items-center"
          onClick={handleAddNew}
        >
          <Plus className="w-4 h-4" /> Thêm mới
        </button>
      </div>

      {/* 🏨 Modal thêm/sửa */}
      {modal && (
        <HotelForm
          setModal={setModal}
          selectedHotel={selectedHotel}
          onSuccess={fetchHotels}
        />
      )}

      {/* 📋 Danh sách hotel */}
      {isLoad ? (
        <div className="flex justify-center items-center h-64">
          <span className="loading loading-spinner loading-xl text-blue-600"></span>
        </div>
      ) : (
        <HotelList hotels={hotels} onEdit={handleEdit} />
      )}
      {/* 📄 Phân trang */}
      <div className="flex justify-center mt-4 space-x-2">
        <button
          disabled={page <= 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-3 py-1 border rounded-lg disabled:opacity-50"
        >
          Trước
        </button>
        <span className="px-3 py-1">
          Trang {page} / {pagination?.totalPages || 1}
        </span>
        <button
          disabled={page >= (pagination?.totalPages || 1)}
          onClick={() => setPage((p) => p + 1)}
          className="px-3 py-1 border rounded-lg disabled:opacity-50"
        >
          Sau
        </button>
      </div>
    </div>
  );
};

export default HotelPage;

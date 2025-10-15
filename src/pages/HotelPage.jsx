import { useEffect, useState } from "react";
import HotelList from "../components/Hotel/HotelList";
import HotelForm from "../components/Hotel/HotelForm";
import hotelApi from "../api/hotelApi";

const HotelPage = () => {
  const [modal, setModal] = useState(false);
  const [hotels, setHotels] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(null); // ✅ thêm state này để sửa

  // ✅ Hàm lấy danh sách
  const fetchHotels = async () => {
    try {
      const res = await hotelApi.getAll();
      setHotels(res.data);
    } catch (error) {
      console.error("Lỗi khi tải danh sách khách sạn:", error);
    }
  };

  // ✅ Tự reload khi modal đóng hoặc mở (đã dùng đúng)
  useEffect(() => {
    fetchHotels();
  }, [modal]);

  // ✅ Khi click “Sửa” → mở modal với dữ liệu cũ
  const handleEdit = (hotel) => {
    setSelectedHotel(hotel);
    setModal(true);
  };

  // ✅ Khi click “Thêm mới” → mở modal rỗng
  const handleAddNew = () => {
    setSelectedHotel(null);
    setModal(true);
  };

  return (
    <div className="flex flex-col">
      {/* Tiêu đề */}
      <div className="flex justify-center font-bold text-3xl mt-6">
        <h1>Hotels Manager</h1>
      </div>

      {/* Nút thêm */}
      <div className="flex justify-end m-4">
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 active:scale-95 transition"
          onClick={handleAddNew}
        >
          + New Hotel
        </button>
      </div>

      {/* Modal form thêm / sửa */}
      {modal && (
        <HotelForm
          setModal={setModal}
          selectedHotel={selectedHotel} // ✅ truyền dữ liệu cũ khi sửa
          onSuccess={fetchHotels} // ✅ reload lại list sau khi submit
        />
      )}

      {/* Danh sách hotel */}
      <HotelList hotels={hotels} onEdit={handleEdit} onDelete={fetchHotels} />
    </div>
  );
};

export default HotelPage;

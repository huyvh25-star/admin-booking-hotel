import { useState } from "react";
import { toast } from "sonner";
import { Pencil, ImageUp, Image, X } from "lucide-react";
import roomImageApi from "../../api/roomImageApi";
import UploadImage from "../RoomImage/UploadImage";
import RoomImages from "../RoomImage/RoomImages";
const RoomList = ({ rooms, handleUpdate }) => {
  const [selectedRoomId, setSelectedRoomId] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  // trạng thái hiển thị ảnh
  const [viewImages, setViewImages] = useState([]); // danh sách ảnh của phòng
  const [showViewModal, setShowViewModal] = useState(false); // bật/tắt modal xem ảnh

  const handleUploadImage = (roomId) => {
    setSelectedRoomId(roomId);
  };
  // --- Xem danh sách ảnh ---
  const handleShowImage = async (id) => {
    try {
      const res = await roomImageApi.getAll(id);
      const images = res.data || []; // dữ liệu trả về từ backend
      setViewImages(images);
      setCurrentIndex(0); // 👉 luôn hiển thị ảnh đầu tiên
      setShowViewModal(true);
    } catch (error) {
      console.error("Lỗi khi lấy ảnh:", error);
      toast.error("Không thể tải danh sách ảnh!");
    }
  };

  // --- Đóng modal xem ảnh ---
  const closeViewModal = () => {
    setViewImages([]);
    setShowViewModal(false);
  };

  return (
    <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 shadow-sm mt-5">
      <table className="table table-zebra w-full">
        <thead className="bg-base-200 text-base-content/80">
          <tr>
            <th>Tên</th>
            <th>Giá</th>
            <th>Giá thêm người</th>
            <th>Số người</th>
            <th>Số lượng</th>
            <th>Mô tả</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((item) => (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>{item.price}</td>
              <td>{item.price_for_extra_people}</td>
              <td>{item.capacity}</td>
              <td>{item.quantity}</td>
              <td>{item.description}</td>
              <td className="flex">
                <button
                  onClick={() => handleUpdate(item)}
                  className="btn btn-sm btn-outline btn-primary flex items-center gap-1"
                >
                  <Pencil size={16} /> Edit
                </button>
                <button
                  onClick={() => handleUploadImage(item._id)}
                  className="ml-2 btn btn-sm btn-outline btn-success flex items-center gap-1"
                >
                  <ImageUp size={16} /> Upload
                </button>
                <button
                  onClick={() => handleShowImage(item._id)}
                  className="ml-2 btn btn-sm btn-outline btn-info flex items-center gap-1"
                >
                  <Image size={16} /> Xem ảnh
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/*Modal upload ảnh */}
      {selectedRoomId && (
        <UploadImage
          selectedRoomId={selectedRoomId}
          setSelectedRoomId={setSelectedRoomId}
        />
      )}

      {/* Modal xem ảnh dạng slideshow */}
      {showViewModal && (
        <RoomImages
          closeViewModal={closeViewModal}
          viewImages={viewImages}
          setCurrentIndex={setCurrentIndex}
          currentIndex={currentIndex}
        />
      )}
    </div>
  );
};

export default RoomList;

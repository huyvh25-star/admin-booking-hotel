import { useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { X } from "lucide-react";
import roomImageApi from "../../api/roomImageApi";
const UploadImage = ({ selectedRoomId, setSelectedRoomId }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [isLoad, setIsload] = useState(false);
  // --- 1️⃣ Chọn ảnh ---
  const handleSelectImages = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
    const previewURLs = files.map((file) => URL.createObjectURL(file));
    setPreviewImages(previewURLs);
  };
  // --- 2️⃣ Upload ảnh ---
  const uploadImages = async () => {
    if (selectedFiles.length === 0) {
      toast.warning("Vui lòng chọn ít nhất 1 ảnh!");
      return;
    }

    const formData = new FormData();
    selectedFiles.forEach((file) => formData.append("images", file));

    try {
      setIsload(true);
      const res = await axios.post(
        "http://localhost:5000/api/upload/multiple",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      // ✅ Lấy cả publicId + imageUrl
      const uploadedImages = res.data.images.map((img) => ({
        imageUrl: img.imageUrl,
        publicId: img.publicId,
      }));

      // 👉 Gửi thông tin ảnh về DB
      await Promise.all(
        uploadedImages.map((item) =>
          roomImageApi.add({
            room_id: selectedRoomId,
            url: item.imageUrl,
            img_id: item.publicId,
          })
        )
      );

      toast.success("Upload ảnh thành công!");

      // Reset state
      setSelectedFiles([]);
      setPreviewImages([]);
      setSelectedRoomId(null);
      setIsload(false);
    } catch (error) {
      console.error("Lỗi upload:", error);
      toast.error("Upload thất bại!");
      setIsload(false);
    }
  };
  // --- 3️⃣ Khi click nút Upload của từng room ---

  // --- 4️⃣ Đóng modal upload ---
  const handleCloseModal = () => {
    setSelectedRoomId(null);
    setSelectedFiles([]);
    setPreviewImages([]);
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-[400px] relative">
        <button
          onClick={handleCloseModal}
          className="absolute top-2 right-2 text-gray-500 hover:text-black"
        >
          <X size={20} />
        </button>

        <h3 className="text-lg font-bold mb-3">
          Upload ảnh cho phòng: {selectedRoomId}
        </h3>

        {/* Chọn ảnh */}
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleSelectImages}
          className="file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 
              file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200 cursor-pointer mb-4"
        />

        {/* Hiển thị preview */}
        <div className="flex flex-wrap gap-2 mb-4">
          {previewImages.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`preview-${idx}`}
              className="w-20 h-20 object-cover rounded-lg border"
            />
          ))}
        </div>

        {/* Nút tải ảnh */}
        {isLoad ? (
          <button className="btn btn-disabled w-full">
            <span className="loading loading-spinner"></span>
            Đang tải lên...
          </button>
        ) : (
          <button onClick={uploadImages} className="btn btn-info w-full">
            Tải ảnh lên
          </button>
        )}
      </div>
    </div>
  );
};

export default UploadImage;

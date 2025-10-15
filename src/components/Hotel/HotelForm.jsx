import { CircleX, ArrowDownToLine } from "lucide-react";
import { useEffect, useState } from "react";
import { uploadSingleFile } from "../../api/uploadFile";
import { toast } from "sonner";
import hotelApi from "../../api/hotelApi";

const HotelForm = ({ setModal, selectedHotel, onSuccess }) => {
  const [data, setData] = useState({
    name: "",
    address: "",
    rating: "",
    description: "",
    img: "",
  });
  const [previewImg, setPreviewImg] = useState(""); // ✅ preview ảnh
  const [isLoad, setIsLoad] = useState(false);

  // Load dữ liệu khi sửa
  useEffect(() => {
    if (selectedHotel) {
      setData({
        name: selectedHotel.name || "",
        address: selectedHotel.address || "",
        rating: selectedHotel.rating || "",
        description: selectedHotel.description || "",
        img: selectedHotel.img || "",
      });
      setPreviewImg(selectedHotel.img || "");
    } else {
      setData({
        name: "",
        address: "",
        rating: "",
        description: "",
        img: "",
      });
      setPreviewImg("");
    }
  }, [selectedHotel]);

  // Cập nhật dữ liệu form
  const handleData = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file" && files && files[0]) {
      setData((prev) => ({ ...prev, [name]: files[0] }));
      setPreviewImg(URL.createObjectURL(files[0])); // tạo preview
    } else {
      setData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Lưu dữ liệu (thêm hoặc sửa)
  const handleSave = async (e) => {
    e.preventDefault();
    try {
      setIsLoad(true);

      let imgUrl = data.img;

      // Nếu chọn file mới → upload
      if (data.img && typeof data.img !== "string") {
        const uploadRes = await uploadSingleFile(data.img);
        imgUrl = uploadRes.imageUrl;
      }

      const payload = { ...data, img: imgUrl };

      if (selectedHotel) {
        await hotelApi.update(selectedHotel._id, payload);
        toast.success("Cập nhật khách sạn thành công!");
      } else {
        await hotelApi.add(payload);
        toast.success("Thêm khách sạn thành công!");
      }

      setIsLoad(false);
      setModal(false);
      onSuccess(); // reload danh sách
    } catch (error) {
      console.error(error);
      toast.error("Có lỗi xảy ra!");
      setIsLoad(false);
    }
  };

  return (
    <div
      className="w-[500px] flex flex-col shadow-2xl bg-white shadow-black 
      p-4 fixed z-10 h-[600px] rounded-2xl right-96 items-center py-2 px-6 
      justify-around animate-fade-in"
    >
      <h3 className="font-bold text-lg text-gray-700 mb-2">
        {selectedHotel ? "Cập nhật khách sạn" : "Thêm khách sạn mới"}
      </h3>

      {/* Ảnh */}
      <div className="flex w-full justify-between items-center">
        <label className="flex-1 font-medium">Chọn Ảnh</label>
        <input
          type="file"
          name="img"
          onChange={handleData}
          className="mt-2 w-[65%] px-2 py-1 border border-gray-300 rounded-lg 
          focus:outline-none focus:border-blue-500 focus:ring-2 
          focus:ring-blue-100 transition"
        />
      </div>

      {/* Hiển thị preview */}
      {previewImg && (
        <div className="mt-2 w-32 h-32 border rounded-lg overflow-hidden shadow">
          <img
            src={previewImg}
            alt="preview"
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Tên khách sạn */}
      <div className="flex w-full justify-between items-center">
        <label className="flex-1 font-medium">Tên khách sạn</label>
        <input
          type="text"
          name="name"
          value={data.name}
          onChange={handleData}
          placeholder="Tên khách sạn"
          className="mt-2 w-[65%] px-2 py-1 border border-gray-300 rounded-lg 
          focus:outline-none focus:border-blue-500 focus:ring-2 
          focus:ring-blue-100 transition"
        />
      </div>

      {/* Địa chỉ */}
      <div className="flex w-full justify-between items-center">
        <label className="flex-1 font-medium">Địa chỉ</label>
        <input
          type="text"
          name="address"
          value={data.address}
          onChange={handleData}
          placeholder="Địa chỉ khách sạn"
          className="mt-2 w-[65%] px-2 py-1 border border-gray-300 rounded-lg 
          focus:outline-none focus:border-blue-500 focus:ring-2 
          focus:ring-blue-100 transition"
        />
      </div>

      {/* Rating */}
      <div className="flex w-full justify-between items-center">
        <label className="flex-1 font-medium">Đánh giá</label>
        <input
          type="number"
          step="0.1"
          name="rating"
          value={data.rating}
          onChange={handleData}
          placeholder="VD: 4.5"
          className="mt-2 w-[65%] px-2 py-1 border border-gray-300 rounded-lg 
          focus:outline-none focus:border-blue-500 focus:ring-2 
          focus:ring-blue-100 transition"
        />
      </div>

      {/* Description */}
      <div className="flex w-full justify-between items-start">
        <label className="flex-1 font-medium mt-2">Mô tả</label>
        <textarea
          name="description"
          value={data.description}
          onChange={handleData}
          placeholder="Mô tả khách sạn"
          className="mt-2 w-[65%] px-2 py-1 border border-gray-300 rounded-lg 
          focus:outline-none focus:border-blue-500 focus:ring-2 
          focus:ring-blue-100 transition"
        />
      </div>

      {/* Buttons */}
      <div className="flex w-full justify-end items-center mt-4">
        <button
          onClick={() => setModal(false)}
          className="btn btn-error mr-4 flex items-center gap-2"
        >
          <CircleX size={18} /> Đóng
        </button>

        {isLoad ? (
          <button className="btn btn-info flex items-center gap-2" disabled>
            <span className="loading loading-spinner"></span>
            Đang lưu...
          </button>
        ) : (
          <button
            onClick={handleSave}
            className="btn btn-info flex items-center gap-2"
          >
            <ArrowDownToLine size={18} />
            {selectedHotel ? "Cập nhật" : "Lưu"}
          </button>
        )}
      </div>
    </div>
  );
};

export default HotelForm;

import { Plus } from "lucide-react";
import { useState } from "react";
import { uploadSingleFile } from "../api/uploadFile";
import { toast } from "sonner";
import bannerApi from "../api/bannerApi";
const BannerPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const [isLoad, setIsLoad] = useState(false);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
    }
  };

  const handleAddClick = () => {
    setShowForm(!showForm);
    setPreview(null);
    setFile(null);
  };

  const handlerUpload = async () => {
    console.log(file);
    try {
      setIsLoad(true);
      const urlImage = await uploadSingleFile(file);
      console.log("kết quả upload", urlImage);
      // tiếp tục
      if (urlImage.imageUrl) {
        const data = {
          url: urlImage.imageUrl,
        };
        // save img
        const res = await bannerApi.add(data);
        if (res.code === 200) {
          toast.success("thêm ảnh thành công!");
          setIsLoad(false);
          setShowForm(false);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("thêm thất bại!");
    }
  };
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 overflow-y-scroll">
      {/* Tiêu đề */}
      <div className="flex justify-center font-bold text-3xl mt-6">
        <h1>Quản Lý Banner</h1>
      </div>

      {/* Nút thêm mới */}
      <div className="flex justify-end px-8 mt-4">
        <button
          onClick={handleAddClick}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 active:scale-95 transition flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          {showForm ? "Đóng lại" : "Thêm mới"}
        </button>
      </div>

      {/* Form thêm banner */}
      {showForm ? (
        <div>danh sách banner</div>
      ) : (
        <div className="bg-white shadow-md rounded-xl w-[90%] mx-auto mt-6 p-6 flex justify-around">
          {/* Cột hiển thị ảnh */}
          <div className="w-[40%] flex flex-col items-center justify-center bg-gray-100 rounded-lg p-4">
            <h3 className="font-semibold text-gray-700 mb-4">Hiển Thị Ảnh</h3>
            {preview ? (
              <img
                src={preview}
                alt="Banner preview"
                className="w-full h-64 object-cover rounded-lg border border-gray-300 shadow-sm"
              />
            ) : (
              <div className="w-full h-64 flex items-center justify-center border-2 border-dashed border-gray-400 rounded-lg text-gray-400">
                Chưa có ảnh
              </div>
            )}
          </div>

          {/* Cột thêm ảnh */}
          <div className="w-[40%] bg-gray-100 rounded-lg p-4 flex flex-col items-center">
            <h3 className="font-semibold text-gray-700 mb-4">Thêm Ảnh</h3>

            <label
              htmlFor="banner-upload"
              className="w-full border-2 border-dashed border-blue-400 rounded-xl p-4 text-center text-gray-500 hover:bg-blue-50 hover:border-blue-600 transition cursor-pointer"
            >
              Chọn ảnh
              <input
                id="banner-upload"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>

            {preview && (
              <div>
                <button
                  onClick={() => {
                    setPreview(null);
                    setFile(null);
                  }}
                  className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                >
                  Hủy
                </button>
                {isLoad ? (
                  <button className="ml-4 mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition disabled:**:">
                    <span className="loading loading-spinner"></span>
                  </button>
                ) : (
                  <button
                    onClick={handlerUpload}
                    className="ml-4 mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                  >
                    Lưu ảnh
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default BannerPage;

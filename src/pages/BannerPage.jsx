import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { uploadSingleFile } from "../api/uploadFile";
import { toast } from "sonner";
import bannerApi from "../api/bannerApi";
import BannerList from "../components/Banner/BannerList";

const BannerPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const [isLoad, setIsLoad] = useState(false);
  const [loadingList, setLoadingList] = useState(true);
  const [banners, setBanners] = useState([]);

  // fetch banners
  const fetchBanners = async () => {
    try {
      setLoadingList(true);
      const rest = await bannerApi.getAll();
      setTimeout(() => {
        // Thêm delay nhỏ cho hiệu ứng load mượt hơn
        setBanners(rest.data);
        setLoadingList(false);
      }, 700);
    } catch (error) {
      console.log(error);
      setLoadingList(false);
    }
  };

  // update list when update status banner
  const handlerUpdateStatus = () => {
    fetchBanners();
  };

  useEffect(() => {
    fetchBanners();
  }, [showForm]);

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
    try {
      setIsLoad(true);
      const urlImage = await uploadSingleFile(file);
      if (urlImage.imageUrl) {
        const data = { url: urlImage.imageUrl };
        const res = await bannerApi.add(data);
        if (res.code === 200) {
          toast.success("Thêm ảnh thành công!");
          setShowForm(false);
          fetchBanners();
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Thêm thất bại!");
    } finally {
      setIsLoad(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 overflow-y-auto">
      {/* Tiêu đề */}
      <div className="flex justify-center font-bold text-3xl mt-6">
        <h1>Quản Lý Banner</h1>
      </div>

      {/* Nút thêm mới */}
      <div className="flex justify-end px-8 mt-6">
        <button
          onClick={handleAddClick}
          className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-xl shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          {showForm ? "Đóng lại" : "Thêm mới"}
        </button>
      </div>

      {/* Form thêm banner */}
      {showForm ? (
        <div className="bg-white shadow-lg rounded-2xl w-[90%] mx-auto mt-8 p-8 flex flex-col md:flex-row justify-between gap-6 transition-all">
          {/* Cột hiển thị ảnh */}
          <div className="flex-1 flex flex-col items-center justify-center bg-gray-100 rounded-xl p-6 shadow-inner">
            <h3 className="font-semibold text-gray-700 mb-4 text-lg">
              Hiển Thị Ảnh
            </h3>
            {preview ? (
              <img
                src={preview}
                alt="Banner preview"
                className="w-full h-80 object-cover rounded-xl border border-gray-300 shadow-md transition-transform duration-500 hover:scale-[1.02]"
              />
            ) : (
              <div className="w-full h-80 flex items-center justify-center border-2 border-dashed border-gray-400 rounded-xl text-gray-400 text-sm">
                Chưa có ảnh
              </div>
            )}
          </div>

          {/* Cột thêm ảnh */}
          <div className="flex-1 bg-gray-100 rounded-xl p-6 flex flex-col items-center shadow-inner">
            <h3 className="font-semibold text-gray-700 mb-4 text-lg">
              Thêm Ảnh
            </h3>

            <label
              htmlFor="banner-upload"
              className="w-full border-2 border-dashed border-blue-400 rounded-xl p-6 text-center text-gray-600 hover:bg-blue-50 hover:border-blue-600 transition cursor-pointer"
            >
              <span className="font-medium">Chọn ảnh từ thiết bị</span>
              <input
                id="banner-upload"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>

            {preview && (
              <div className="mt-6 flex gap-4">
                <button
                  onClick={() => {
                    setPreview(null);
                    setFile(null);
                  }}
                  className="px-5 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 shadow-md transition"
                >
                  Hủy
                </button>
                <button
                  onClick={handlerUpload}
                  disabled={isLoad}
                  className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-md transition flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {isLoad ? (
                    <>
                      <span className="loading loading-spinner"></span>
                      Đang tải...
                    </>
                  ) : (
                    "Lưu ảnh"
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="w-full mt-8 px-8">
          {loadingList ? (
            // Hiệu ứng skeleton loading
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="h-56 bg-gray-200 rounded-xl shadow-inner"
                ></div>
              ))}
            </div>
          ) : (
            <BannerList
              banners={banners}
              handlerUpdateStatus={handlerUpdateStatus}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default BannerPage;

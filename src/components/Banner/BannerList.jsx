import { useState } from "react";
import bannerApi from "../../api/bannerApi";
import { toast } from "sonner";

const BannerList = ({ banners = [], handlerUpdateStatus }) => {
  const [loadingId, setLoadingId] = useState(null); // Lưu id banner đang xử lý

  const handleChangeStatus = async (id) => {
    try {
      setLoadingId(id); // bật loading cho banner này
      await bannerApi.updateStatus(id);
      handlerUpdateStatus(); // gọi lại để refresh list
      toast.success("cập nhật thành công");
    } catch (error) {
      console.log(error);
      toast.error("cập nhật thất bại");
    } finally {
      setLoadingId(null); // tắt loading
    }
  };

  return (
    <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 shadow-sm">
      <table className="table table-zebra w-full">
        <thead className="bg-base-200 text-base-content/80">
          <tr>
            <th>Ảnh</th>
            <th>Trạng thái</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {banners.map((item) => {
            const isLoading = loadingId === item._id;
            return (
              <tr key={item._id} className="border-b hover:bg-gray-50">
                <td className="p-3">
                  <img
                    src={item.url}
                    alt="banner"
                    className="w-24 h-16 object-cover rounded"
                  />
                </td>

                <td className="p-3 text-sm">
                  {item.active ? (
                    <span className="text-green-600 font-semibold">
                      Đang hoạt động
                    </span>
                  ) : (
                    <span className="text-red-500 font-semibold">
                      Đang ngừng
                    </span>
                  )}
                </td>

                <td className="p-3">
                  <button
                    disabled={isLoading}
                    onClick={() => handleChangeStatus(item._id)}
                    className={`flex items-center justify-center gap-2 px-3 py-1 text-sm rounded-lg text-white transition ${
                      item.active
                        ? "bg-red-500 hover:bg-red-600"
                        : "bg-green-500 hover:bg-green-600"
                    } ${isLoading ? "opacity-70 cursor-not-allowed" : ""}`}
                  >
                    {isLoading ? (
                      <>
                        <span className="loading loading-spinner loading-sm"></span>
                        Đang xử lý...
                      </>
                    ) : item.active ? (
                      "Ngừng hiển thị"
                    ) : (
                      "Hiển thị"
                    )}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default BannerList;

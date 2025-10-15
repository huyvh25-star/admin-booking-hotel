import { Pencil, Trash2 } from "lucide-react";
import hotelApi from "../../api/hotelApi";

const HotelList = ({ hotels, onEdit, onDelete }) => {
  const handleDelete = async (id) => {
    const confirm = window.confirm("Bạn có chắc muốn xóa khách sạn này?");
    if (!confirm) return;

    try {
      await hotelApi.delete(id);
      onDelete(); // gọi lại fetchHotels trong HotelPage
    } catch (error) {
      console.error("Lỗi khi xóa khách sạn:", error);
    }
  };

  return (
    <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 shadow-sm">
      <table className="table table-zebra w-full">
        {/* head */}
        <thead className="bg-base-200 text-base-content/80">
          <tr>
            <th>#</th>
            <th>Image</th>
            <th>Name</th>
            <th>Address</th>
            <th>Rating</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {hotels.length > 0 ? (
            hotels.map((hotel, index) => (
              <tr className="hover" key={hotel._id || index}>
                <td>{index + 1}</td>

                {/* Hình ảnh */}
                <td className="p-2">
                  <div className="w-16 h-16 rounded-xl overflow-hidden shadow-sm border border-base-300">
                    <img
                      src={hotel.img || "/placeholder.jpg"}
                      alt={hotel.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </td>

                {/* Tên */}
                <td className="font-semibold">{hotel.name}</td>

                {/* Địa chỉ */}
                <td className="text-sm text-gray-600">{hotel.address}</td>

                {/* Đánh giá */}
                <td>
                  <div className="badge badge-success gap-1">
                    {hotel.rating || 0} ★
                  </div>
                </td>

                {/* Mô tả */}
                <td className="max-w-xs truncate text-sm text-gray-500">
                  {hotel.description || "—"}
                </td>

                {/* Hành động */}
                <td>
                  <div className="flex gap-2">
                    <button
                      className="btn btn-sm btn-outline btn-primary flex items-center gap-1"
                      onClick={() => onEdit(hotel)}
                    >
                      <Pencil size={16} /> Edit
                    </button>

                    {/* <button
                      className="btn btn-sm btn-outline btn-error flex items-center gap-1"
                      onClick={() => handleDelete(hotel._id)}
                    >
                      <Trash2 size={16} /> Delete
                    </button> */}
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center py-6 text-gray-500">
                Không có khách sạn nào được tìm thấy.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default HotelList;

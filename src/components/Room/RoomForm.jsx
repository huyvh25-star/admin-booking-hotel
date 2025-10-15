import { CircleX, ArrowDownToLine } from "lucide-react";
import { useEffect, useState } from "react";
import roomApi from "../../api/roomApi";
import { toast } from "sonner";
const RoomForm = ({ id, setModal, selectedRoom }) => {
  const [data, setData] = useState({
    hotel_id: id,
    name: "",
    price: 0,
    price_for_extra_people: 0,
    capacity: 2,
    quantity: 10,
    description: "",
  });

  useEffect(() => {
    if (selectedRoom) {
      console.log("room form : ", selectedRoom);

      setData(selectedRoom);
    } else {
      setData({
        hotel_id: id,
        name: "",
        price: 0,
        price_for_extra_people: 0,
        capacity: 2,
        quantity: 10,
        description: "",
      });
    }
  }, [selectedRoom, id]);

  // Hàm cập nhật state khi input thay đổi
  const handleData = async (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]:
        name === "price" ||
        name === "price_for_extra_people" ||
        name === "capacity" ||
        name === "quantity"
          ? Number(value) // chuyển các trường số thành number
          : value,
    }));
  };
  const save = async (e) => {
    e.preventDefault();
    console.log(data);
    try {
      if (selectedRoom !== null) {
        await roomApi.update(data._id, data);
        toast.success("update thành công");
      } else {
        await roomApi.add(data);
        toast.success("add thành công");
      }
      setModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="w-[500px] flex flex-col shadow-2xl bg-white shadow-black 
      p-4 fixed z-10 h-[600px] rounded-2xl right-96 items-center py-2 px-6 
      justify-around animate-fade-in top-20"
    >
      <h3 className="font-bold text-lg text-gray-700 mb-2">Thêm phòng</h3>

      {/* Tên phòng */}
      <div className="flex w-full justify-between items-center">
        <label className="flex-1 font-medium">Tên phòng</label>
        <input
          type="text"
          name="name"
          value={data.name}
          onChange={handleData}
          placeholder="Tên phòng"
          className="mt-2 w-[65%] px-2 py-1 border border-gray-300 rounded-lg 
          focus:outline-none focus:border-blue-500 focus:ring-2 
          focus:ring-blue-100 transition"
        />
      </div>

      {/* Giá phòng */}
      <div className="flex w-full justify-between items-center">
        <label className="flex-1 font-medium">Giá phòng</label>
        <input
          type="number"
          name="price"
          value={data.price}
          onChange={handleData}
          placeholder="Giá phòng"
          className="mt-2 w-[65%] px-2 py-1 border border-gray-300 rounded-lg 
          focus:outline-none focus:border-blue-500 focus:ring-2 
          focus:ring-blue-100 transition"
        />
      </div>

      {/* Giá khi ở thêm */}
      <div className="flex w-full justify-between items-center">
        <label className="flex-1 font-medium">Giá khi ở thêm</label>
        <input
          type="number"
          name="price_for_extra_people"
          value={data.price_for_extra_people}
          onChange={handleData}
          placeholder="Giá khi ở thêm người"
          className="mt-2 w-[65%] px-2 py-1 border border-gray-300 rounded-lg 
          focus:outline-none focus:border-blue-500 focus:ring-2 
          focus:ring-blue-100 transition"
        />
      </div>

      {/* Số người mặc định */}
      <div className="flex w-full justify-between items-center">
        <label className="flex-1 font-medium">Số người ở mặc định</label>
        <input
          type="number"
          name="capacity"
          value={data.capacity}
          onChange={handleData}
          placeholder="Số người mặc định"
          className="mt-2 w-[65%] px-2 py-1 border border-gray-300 rounded-lg 
          focus:outline-none focus:border-blue-500 focus:ring-2 
          focus:ring-blue-100 transition"
        />
      </div>

      {/* Số lượng phòng */}
      <div className="flex w-full justify-between items-center">
        <label className="flex-1 font-medium">Số lượng phòng</label>
        <input
          type="number"
          name="quantity"
          value={data.quantity}
          onChange={handleData}
          placeholder="Số lượng phòng trống"
          className="mt-2 w-[65%] px-2 py-1 border border-gray-300 rounded-lg 
          focus:outline-none focus:border-blue-500 focus:ring-2 
          focus:ring-blue-100 transition"
        />
      </div>

      {/* Mô tả phòng */}
      <div className="flex w-full justify-between items-center">
        <label className="flex-1 font-medium">Mô tả phòng</label>
        <textarea
          name="description"
          value={data.description}
          onChange={handleData}
          placeholder="Mô tả"
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

        <button onClick={save} className="btn btn-info flex items-center gap-2">
          <ArrowDownToLine size={18} /> Lưu
        </button>
      </div>
    </div>
  );
};

export default RoomForm;

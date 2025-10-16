import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import roomApi from "../api/roomApi";
import RoomList from "../components/Room/RoomList";
import RoomForm from "../components/Room/RoomForm";
const RoomPage = () => {
  const { id } = useParams();
  const [rooms, setRooms] = useState([]);
  const [modal, setModal] = useState(false);
  const [selectedRoom, SetSelectedRoom] = useState(null);
  const fetchHotels = async () => {
    try {
      const res = await roomApi.getAll(id);
      setRooms(res.data);
    } catch (error) {
      console.error("Lỗi khi tải danh sách khách sạn:", error);
    }
  };
  useEffect(() => {
    fetchHotels();
  }, [modal]);

  // thêm mới
  const handleAddNew = () => {
    setModal(true);
    SetSelectedRoom(null);
  };
  // cập nhật
  const handleUpdate = (room) => {
    console.log("room : ", room);
    room.hotel_id = room.hotel_id._id;
    SetSelectedRoom(room);
    setModal(true);
  };
  return (
    <div className="flex flex-col justify-around">
      {/* Tiêu đề */}
      <div className="flex justify-center font-bold text-3xl mt-6">
        <h1>Quản Lý Phòng</h1>
      </div>

      {/* Nút thêm */}
      <div className="flex justify-end m-4">
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 active:scale-95 transition"
          onClick={handleAddNew}
        >
          thêm phòng
        </button>
      </div>
      {/* modal */}
      {modal && (
        <RoomForm id={id} setModal={setModal} selectedRoom={selectedRoom} />
      )}
      <div>
        {Array.isArray(rooms) && rooms.length > 0 ? (
          <RoomList rooms={rooms} handleUpdate={handleUpdate} />
        ) : (
          <h1>Dữ liệu trống</h1>
        )}
      </div>
    </div>
  );
};

export default RoomPage;

import { Pencil } from "lucide-react";
const RoomList = ({ rooms, handleUpdate }) => {
  console.log(rooms);
  return (
    <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 shadow-sm mt-5">
      <table className="table table-zebra w-full">
        {/* head */}
        <thead className="bg-base-200 text-base-content/80">
          <tr>
            <th>Tên</th>
            <th>giá</th>
            <th>giá ở thêm người</th>
            <th>số người ở mặc định</th>
            <th>số lượng</th>
            <th>mô tả</th>
            <th>Actions</th>
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
              <td>
                <button
                  onClick={() => handleUpdate(item)}
                  className="btn btn-sm btn-outline btn-primary flex items-center gap-1"
                >
                  <Pencil size={16} /> Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RoomList;

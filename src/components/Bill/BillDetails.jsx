export default function BillDetails({ bill }) {
  return (
    <div className="bg-gray-50 p-4 rounded-md mt-2 space-y-1 text-sm text-gray-600 shadow-inner">
      <div>
        <strong>Hotel:</strong> {bill.hotel_id?.name} - {bill.hotel_id?.address}
      </div>
      <div>
        <strong>Room:</strong> {bill.room_id?.name} - Giá:{" "}
        {bill.room_id?.price.toLocaleString("vi-VN")}₫
      </div>
      <div>
        <strong>User:</strong> {bill.user_id?.name} - {bill.user_id?.email}
      </div>
      <div>
        <strong>Phone:</strong> {bill.phone}
      </div>
      <div>
        <strong>Note:</strong> {bill.note || "Không có"}
      </div>
      <div>
        <strong>Payment Status:</strong>{" "}
        {bill.paymentStatus === "paid" ? "Đã thanh toán" : "Chưa thanh toán"}
      </div>
    </div>
  );
}

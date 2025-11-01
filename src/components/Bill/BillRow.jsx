import { useState } from "react";
import {
  Hotel,
  User,
  Mail,
  Phone,
  Home,
  DollarSign,
  CalendarDays,
} from "lucide-react";
import BillDetails from "./BillDetails";

export default function BillRow({ bill, handleUpdateStatus }) {
  const [showDetails, setShowDetails] = useState(false);

  const checkIn = new Date(bill.check_in);
  const checkOut = new Date(bill.check_out);
  const numberOfDays = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-3 border border-gray-100">
      <div className="flex justify-between items-start">
        <div className="space-y-1 flex-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-semibold text-gray-800">
              <Hotel className="w-5 h-5 text-blue-500" /> {bill.hotel_id?.name}{" "}
            </div>
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="text-sm text-blue-600 hover:underline"
            >
              {showDetails ? "Ẩn" : "Chi tiết"}
            </button>
          </div>

          <div className="flex flex-wrap gap-4 mt-1 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <User className="w-4 h-4" /> {bill.user_id?.name}
            </div>
            <div className="flex items-center gap-1">
              <Mail className="w-4 h-4" /> {bill.user_id?.email}
            </div>
            <div className="flex items-center gap-1">
              <Phone className="w-4 h-4" /> {bill.phone}
            </div>
            <div className="flex items-center gap-1">
              <Home className="w-4 h-4" /> {bill.room_id?.name}
            </div>
            <div className="flex items-center gap-1">
              <CalendarDays className="w-4 h-4" />{" "}
              {checkIn.toLocaleDateString("vi-VN")} →{" "}
              {checkOut.toLocaleDateString("vi-VN")} ({numberOfDays} ngày)
            </div>
            <div className="flex items-center gap-1">
              <DollarSign className="w-4 h-4" />
              <span
                className={`font-medium px-2 py-0.5 rounded-full text-xs ${
                  bill.paymentStatus === "paid"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {bill.paymentStatus === "paid"
                  ? "Đã thanh toán"
                  : "Chưa thanh toán"}
              </span>
            </div>
            <div
              className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                bill.status === "pending"
                  ? "bg-yellow-100 text-yellow-700"
                  : bill.status === "confirmed"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {bill.status}
            </div>
          </div>
        </div>

        {bill.status === "pending" && (
          <div className="flex flex-col gap-2 ml-4">
            <button
              className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition text-sm"
              onClick={() =>
                handleUpdateStatus({ _id: bill._id, status: "confirmed" })
              }
            >
              Xác nhận
            </button>

            <button
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition text-sm"
              onClick={() =>
                handleUpdateStatus({ _id: bill._id, status: "cancelled" })
              }
            >
              Hủy
            </button>
          </div>
        )}
      </div>

      {showDetails && <BillDetails bill={bill} />}
    </div>
  );
}

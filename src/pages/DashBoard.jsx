import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { Hotel, Users, DollarSign, TrendingUp, Filter } from "lucide-react";
import billApi from "../api/billApi";

export default function DashBoard() {
  const [stats, setStats] = useState({
    totalHotels: 0,
    totalUsers: 0,
    totalRevenue: 0,
    totalBills: 0,
    revenueByDate: [],
    revenueByHotel: [],
    topUsers: [],
  });
  const [filterType, setFilterType] = useState("day");
  const [loading, setLoading] = useState(true);

  const fetchData = async (type = "day") => {
    try {
      setLoading(true);
      const res = await billApi.getStats({ type });
      if (res) {
        setStats(res);
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu thống kê:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(filterType);
  }, [filterType]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-lg">
        <span className="loading loading-spinner loading-lg text-primary"></span>
        &nbsp;Đang tải dữ liệu thống kê...
      </div>
    );

  // Màu cho pie chart
  const COLORS = [
    "#3b82f6",
    "#22c55e",
    "#eab308",
    "#f97316",
    "#ef4444",
    "#8b5cf6",
  ];
  console.log("stats : ", stats);

  return (
    <div className="p-6 bg-base-200 min-h-screen">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          📊 Thống Kê Hệ Thống
        </h1>

        {/* Bộ lọc */}
        <div className="flex items-center gap-3 bg-white rounded-lg shadow-md p-3">
          <Filter className="text-gray-600" size={20} />
          <select
            className="select select-bordered select-sm"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="day">Theo ngày</option>
            <option value="month">Theo tháng</option>
            <option value="year">Theo năm</option>
          </select>
        </div>
      </div>

      {/* 4 THẺ TỔNG QUAN */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="card bg-primary text-primary-content shadow-lg hover:scale-105 transition-transform duration-300">
          <div className="card-body items-center text-center">
            <Hotel size={36} />
            <h2 className="card-title">Tổng khách sạn</h2>
            <p className="text-2xl font-semibold">
              {stats?.totalHotels?.toLocaleString() || 0}
            </p>
          </div>
        </div>

        <div className="card bg-secondary text-secondary-content shadow-lg hover:scale-105 transition-transform duration-300">
          <div className="card-body items-center text-center">
            <Users size={36} />
            <h2 className="card-title">Tổng khách hàng</h2>
            <p className="text-2xl font-semibold">
              {stats?.totalUsers?.toLocaleString() || 0}
            </p>
          </div>
        </div>

        <div className="card bg-accent text-accent-content shadow-lg hover:scale-105 transition-transform duration-300">
          <div className="card-body items-center text-center">
            <DollarSign size={36} />
            <h2 className="card-title">Tổng doanh thu</h2>
            <p className="text-2xl font-semibold">
              {stats?.totalRevenue ? stats.totalRevenue.toLocaleString() : 0}₫
            </p>
          </div>
        </div>

        <div className="card bg-info text-info-content shadow-lg hover:scale-105 transition-transform duration-300">
          <div className="card-body items-center text-center">
            <TrendingUp size={36} />
            <h2 className="card-title">Tổng hóa đơn</h2>
            <p className="text-2xl font-semibold">
              {stats?.totalBills?.toLocaleString() || 0}
            </p>
          </div>
        </div>
      </div>

      {/* BIỂU ĐỒ DOANH THU */}
      <div className="card bg-base-100 shadow-xl mb-10">
        <div className="card-body">
          <h2 className="card-title mb-4">
            💰 Doanh thu theo{" "}
            {filterType === "day"
              ? "ngày"
              : filterType === "month"
              ? "tháng"
              : "năm"}
          </h2>
          {stats.revenueByDate?.length > 0 ? (
            <div className="h-[400px] min-w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats.revenueByDate}>
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip
                    formatter={(value) => `${value.toLocaleString()}₫`}
                  />
                  <Bar dataKey="revenue" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <p className="text-center text-gray-500 italic">
              Không có dữ liệu thống kê
            </p>
          )}
        </div>
      </div>

      {/* BIỂU ĐỒ TRÒN DOANH THU THEO KHÁCH SẠN */}
      <div className="card bg-base-100 shadow-xl mb-10">
        <div className="card-body">
          <h2 className="card-title mb-4">🏨 Tỷ lệ doanh thu theo khách sạn</h2>
          {stats.revenueByHotel?.length > 0 ? (
            <div className="h-[400px] flex justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={stats.revenueByHotel}
                    dataKey="totalRevenue"
                    nameKey="hotelName"
                    cx="50%"
                    cy="50%"
                    outerRadius={150}
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(1)}%`
                    }
                  >
                    {stats.revenueByHotel.map((_, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(v) => `${v.toLocaleString()}₫`} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <p className="text-center text-gray-500 italic">
              Không có dữ liệu doanh thu khách sạn
            </p>
          )}
        </div>
      </div>

      {/* TOP KHÁCH HÀNG */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title mb-4">
            👑 Top khách hàng đặt phòng nhiều nhất
          </h2>
          {stats.topUsers?.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Tên khách hàng</th>
                    <th>Email</th>
                    <th>Số lần đặt</th>
                    <th>Tổng chi tiêu</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.topUsers.map((u, i) => (
                    <tr key={i} className="hover">
                      <th>{i + 1}</th>
                      <td>{u.name}</td>
                      <td>{u.email}</td>
                      <td>{u.totalBookings}</td>
                      <td>{u.totalSpent.toLocaleString()}₫</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-center text-gray-500 italic">
              Không có dữ liệu khách hàng
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

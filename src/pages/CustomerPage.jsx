import { useEffect, useState } from "react";
import { Eye, Edit, Trash2, UserPlus } from "lucide-react";

const CustomerPage = () => {
  const [loading, setLoading] = useState(true);
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    // Giả lập API
    setTimeout(() => {
      setCustomers([
        {
          id: 1,
          name: "Nguyễn Văn A",
          email: "vana@example.com",
          phone: "0987654321",
          avatar: "https://i.pravatar.cc/100?img=1",
        },
        {
          id: 2,
          name: "Trần Thị B",
          email: "thib@example.com",
          phone: "0912345678",
          avatar: "https://i.pravatar.cc/100?img=2",
        },
        {
          id: 3,
          name: "Lê Hoàng C",
          email: "hoangc@example.com",
          phone: "0978123456",
          avatar: "https://i.pravatar.cc/100?img=3",
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-base-200 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-base-content">
          Danh Sách Khách Hàng
        </h1>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="flex justify-center items-center flex-1">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      ) : (
        <div className="overflow-x-auto shadow-xl rounded-2xl bg-base-100">
          <table className="table table-zebra w-full">
            <thead className="bg-base-300 text-base-content">
              <tr>
                <th>#</th>
                <th>Khách hàng</th>
                <th>Email</th>
                <th>Số điện thoại</th>
                <th className="text-center">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((c, i) => (
                <tr key={c.id} className="hover:bg-base-200 transition-all">
                  <td>{i + 1}</td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-circle w-12 h-12">
                          <img src={c.avatar} alt={c.name} />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{c.name}</div>
                        <div className="text-sm opacity-50">ID: {c.id}</div>
                      </div>
                    </div>
                  </td>
                  <td>{c.email}</td>
                  <td>{c.phone}</td>
                  <td className="text-center">
                    <div className="flex justify-center gap-3">
                      <button className="btn btn-ghost btn-sm text-blue-500 hover:bg-blue-50">
                        <Eye size={18} />
                      </button>
                      <button className="btn btn-ghost btn-sm text-green-500 hover:bg-green-50">
                        <Edit size={18} />
                      </button>
                      <button className="btn btn-ghost btn-sm text-red-500 hover:bg-red-50">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CustomerPage;

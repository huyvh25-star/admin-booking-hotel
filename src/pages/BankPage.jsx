import { useEffect, useState } from "react";
import bankApi from "../api/bankApi";
import { toast } from "sonner";

export default function BankList() {
  const [banks, setBanks] = useState([]);
  const [form, setForm] = useState({
    name: "",
    number: "",
    bankName: "",
    active: true,
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  // Lấy danh sách
  const fetchData = async () => {
    try {
      const res = await bankApi.getAll();
      console.log(res);

      setBanks(res.data.data || res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Thêm / Sửa
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.number || !form.bankName) {
      toast.warning("Vui lòng nhập đầy đủ thông tin");
      return;
    }
    try {
      setLoading(true);
      if (editingId) {
        await bankApi.update(editingId, form);
        toast.success("Cập nhật thành công!");
      } else {
        await bankApi.create(form);
        toast.success("Thêm mới thành công!");
      }
      setForm({ name: "", number: "", bankName: "", active: true });
      setEditingId(null);
      fetchData();
    } catch (error) {
      console.log(error);
      toast.error("Có lỗi xảy ra!");
    } finally {
      setLoading(false);
    }
  };

  // Sửa
  const handleEdit = (bank) => {
    setForm(bank);
    setEditingId(bank._id);
  };

  // Xóa
  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa?")) return;
    try {
      await bankApi.remove(id);
      toast.success("Đã xóa thành công!");
      fetchData();
    } catch (error) {
      console.log(error);
      toast.error("Lỗi khi xóa!");
    }
  };

  // Cập nhật trạng thái
  const handleChangeStatus = async (id) => {
    try {
      await bankApi.updateStatus(id);
      toast.success("Cập nhật trạng thái thành công!");
      fetchData();
    } catch (error) {
      console.log(error);
      toast.error("Lỗi khi cập nhật!");
    }
  };

  return (
    <div className="max-w-5xl mx-auto bg-white p-6 rounded-2xl shadow-sm">
      <h2 className="text-2xl font-bold mb-4 text-pink-600">
        Quản lý tài khoản nhận tiền
      </h2>

      {/* Form thêm / sửa */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row flex-wrap gap-3 items-center mb-6"
      >
        <input
          type="text"
          placeholder="Tên ngân hàng"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="input input-bordered w-full sm:w-1/4"
        />
        <input
          type="text"
          placeholder="Số tài khoản"
          value={form.number}
          onChange={(e) => setForm({ ...form, number: e.target.value })}
          className="input input-bordered w-full sm:w-1/4"
        />
        <input
          type="text"
          placeholder="Tên chủ tài khoản"
          value={form.bankName}
          onChange={(e) => setForm({ ...form, bankName: e.target.value })}
          className="input input-bordered w-full sm:w-1/4"
        />
        <button
          type="submit"
          className={`btn ${
            editingId ? "btn-warning" : "btn-primary"
          } w-full sm:w-auto`}
          disabled={loading}
        >
          {loading ? (
            <span className="loading loading-spinner loading-sm"></span>
          ) : editingId ? (
            "Cập nhật"
          ) : (
            "Thêm mới"
          )}
        </button>
      </form>

      {/* Danh sách */}
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead className="bg-base-200">
            <tr>
              <th>Tên ngân hàng</th>
              <th>Số tài khoản</th>
              <th>Tên chủ tài khoản</th>
              <th>Trạng thái</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {banks.map((bank) => (
              <tr key={bank._id}>
                <td>{bank.name}</td>
                <td>{bank.number}</td>
                <td>{bank.bankName}</td>
                <td>
                  <span
                    className={`badge ${
                      bank.active ? "badge-success" : "badge-error"
                    }`}
                  >
                    {bank.active ? "Đang hoạt động" : "Ngừng"}
                  </span>
                </td>
                <td className="flex gap-2">
                  <button
                    className="btn btn-xs btn-info"
                    onClick={() => handleEdit(bank)}
                  >
                    Sửa
                  </button>
                  <button
                    className="btn btn-xs btn-error"
                    onClick={() => handleDelete(bank._id)}
                  >
                    Xóa
                  </button>
                  <button
                    className={`btn btn-xs ${
                      bank.active ? "btn-warning" : "btn-success"
                    }`}
                    onClick={() => handleChangeStatus(bank._id)}
                  >
                    {bank.active ? "Ngừng" : "Hiển thị"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

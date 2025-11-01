import BillRow from "./BillRow";

export default function BillList({ bills = [], handleUpdateStatus }) {
  if (bills.length === 0)
    return (
      <div className="text-center py-10 text-gray-500">
        Chưa có hóa đơn nào.
      </div>
    );

  return (
    <div className="p-4">
      {bills.map((bill, idx) => (
        <BillRow
          id={bill._id}
          key={bill._id}
          bill={bill}
          index={idx}
          handleUpdateStatus={handleUpdateStatus}
        />
      ))}
    </div>
  );
}

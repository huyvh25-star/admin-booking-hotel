import React from "react";

const BannerList = () => {
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

        <tbody></tbody>
      </table>
    </div>
  );
};

export default BannerList;

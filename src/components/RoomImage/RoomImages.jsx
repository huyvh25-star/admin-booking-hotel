import { X } from "lucide-react";
const RoomImages = ({
  closeViewModal,
  viewImages,
  setCurrentIndex,
  currentIndex,
}) => {
  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
      {/* Nút đóng */}
      <button
        onClick={closeViewModal}
        className="absolute top-5 right-8 text-white hover:text-red-400"
      >
        <X size={30} />
      </button>

      {viewImages.length > 0 ? (
        <div className="flex flex-col items-center gap-4">
          {/* Ảnh chính */}
          <div className="relative flex items-center justify-center">
            {/* Mũi tên trái */}
            <button
              onClick={() =>
                setCurrentIndex((prev) =>
                  prev === 0 ? viewImages.length - 1 : prev - 1
                )
              }
              className="absolute left-[-60px] text-white hover:text-blue-400"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-10 h-10"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
            </button>

            {/* Ảnh hiển thị */}
            <img
              src={viewImages[currentIndex]?.url}
              alt="room"
              className="max-w-[800px] max-h-[500px] object-contain rounded-xl border border-gray-700 shadow-lg"
            />

            {/* Mũi tên phải */}
            <button
              onClick={() =>
                setCurrentIndex((prev) =>
                  prev === viewImages.length - 1 ? 0 : prev + 1
                )
              }
              className="absolute right-[-60px] text-white hover:text-blue-400"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-10 h-10"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>
          </div>

          {/* Thumbnail nhỏ phía dưới */}
          <div className="flex gap-2 mt-4 overflow-x-auto max-w-[800px]">
            {viewImages.map((img, idx) => (
              <img
                key={img._id}
                src={img.url}
                alt="thumb"
                onClick={() => setCurrentIndex(idx)}
                className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 transition-all duration-300 ${
                  currentIndex === idx
                    ? "border-blue-400 scale-105"
                    : "border-transparent opacity-70 hover:opacity-100"
                }`}
              />
            ))}
          </div>

          {/* Chỉ số ảnh */}
          <p className="text-gray-300 text-sm mt-2">
            {currentIndex + 1} / {viewImages.length}
          </p>
        </div>
      ) : (
        <p className="text-gray-400 text-lg">Chưa có ảnh nào.</p>
      )}
    </div>
  );
};
export default RoomImages;

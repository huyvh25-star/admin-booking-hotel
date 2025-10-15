import axios from "axios";
export const uploadSingleFile = async (file) => {
  try {
    const formData = new FormData();
    formData.append("image", file);

    const res = await axios.post(
      "http://localhost:5000/api/upload/single",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    console.log("✅ Upload 1 ảnh thành công:", res.data);
    return res.data; // { message, imageUrl, publicId }
  } catch (error) {
    console.error("❌ Upload 1 ảnh thất bại:", error);
    throw error;
  }
};
export const uploadMultipleFiles = async (files) => {
  try {
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("images", files[i]);
    }

    const res = await axios.post(
      "http://localhost:5000/api/upload/multiple",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    console.log("✅ Upload nhiều ảnh thành công:", res.data);
    return res.data; // { message, images: [ { imageUrl, publicId } ] }
  } catch (error) {
    console.error("❌ Upload nhiều ảnh thất bại:", error);
    throw error;
  }
};
export const deleteImage = async (public_id) => {
  try {
    const res = await axios.delete("http://localhost:5000/api/upload/delete", {
      data: { public_id }, // gửi qua body
      headers: { "Content-Type": "application/json" },
    });

    console.log("🗑️ Xóa ảnh thành công:", res.data);
    return res.data; // { message, result }
  } catch (error) {
    console.error("❌ Xóa ảnh thất bại:", error);
    throw error;
  }
};

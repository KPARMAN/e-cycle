import ApiClient from "../api.js";

export const uploadService = {
  async uploadImage(file) {
    if (!file) {
      throw new Error("No file provided");
    }

    if (!file.type.startsWith("image/")) {
      throw new Error("Only image files are allowed");
    }

    if (file.size > 5 * 1024 * 1024) {
      throw new Error("File size exceeds 5MB limit");
    }

    const response = await ApiClient.uploadFile("/api/upload", file);
    return response;
  },
};

export default uploadService;

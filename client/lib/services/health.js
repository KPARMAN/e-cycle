import ApiClient from "../api.js";

export const healthService = {
  async checkHealth() {
    try {
      const response = await ApiClient.get("/api/health");
      return response;
    } catch (error) {
      throw new Error("Backend is not available: " + error.message);
    }
  },

  async test() {
    try {
      const response = await ApiClient.get("/api/test");
      return response;
    } catch (error) {
      throw new Error("Backend test failed: " + error.message);
    }
  },
};

export default healthService;

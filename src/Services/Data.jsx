// apiService.js
import axios from "axios";

const apiService = {
  get: async (url) => {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  },
};

export default apiService;

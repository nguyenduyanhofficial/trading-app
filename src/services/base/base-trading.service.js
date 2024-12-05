import axios from "axios";

export class BaseTradingService {
  constructor(baseURL) {
    if (new.target === BaseTradingService) {
      throw new Error("BaseTradingService không thể khởi tạo trực tiếp");
    }
    this.baseURL = baseURL;
  }

  async request(config) {
    try {
      const res = await axios({
        ...config,
        url: `${this.baseURL}${config.url}`,
      });
      return res.data;
    } catch (error) {
      if (error.response?.data) {
        throw error.response.data;
      }
      throw error;
    }
  }

  handleError(error) {
    console.error("Lỗi khi gọi API:", error);
    throw error;
  }
}

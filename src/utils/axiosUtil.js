import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: "http://localhost:4000",
  // baseURL: "https://creative-story-backend.adaptable.app",
  baseURL:"https://api.keepitgoingstory.com"
});

export default axiosInstance;

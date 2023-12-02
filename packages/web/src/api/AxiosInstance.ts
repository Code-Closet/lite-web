import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "",
  timeout: 60000,
});

export default axiosInstance;

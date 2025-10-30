import axios from "axios";
import { removeToken } from "../../utils/auth";

const BaseUrl = import.meta.env.VITE_BASE_URL;

const axiosInstace = axios.create({
  baseURL: BaseUrl,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstace.interceptors.request.use(
  (config: any) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstace.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status == 403) {
      removeToken()
    }
    return Promise.reject(error);
  }
);

export default axiosInstace;

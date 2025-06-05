import axios from "axios";
import { endpoints } from "../utils/endpoints/endpoints";
import { pageRoutes } from "../router/pageRoutes";
const BASE_URL = import.meta.env.VITE_BASE_API_URL;

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("userToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;

  if (config.data instanceof FormData) {
    delete config.headers["Content-Type"];
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    let errorData = {
      message: error?.response?.data?.message,
      success: false,
      status: error?.response?.status,
    };
    const originalUrl = error.config?.url;
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("userToken");
      localStorage.removeItem("userData");
      if (!originalUrl.includes(endpoints.userLogin)) {
        errorData.status = 401;
        errorData.message = "Session expired. Please log in again.";
        setTimeout(() => {
          window.location.href = pageRoutes.HOME_PAGE;
        }, 2000);
      }

      return Promise.reject(errorData);
    }
    return Promise.reject(error);
  }
);

export default api;

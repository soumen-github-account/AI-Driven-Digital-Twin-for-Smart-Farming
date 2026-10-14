import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// =====================================================
// ATTACH JWT TOKEN TO EVERY REQUEST
// =====================================================

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("agritwin_token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// =====================================================
// HANDLE AUTH ERRORS
// =====================================================

api.interceptors.response.use(
  (response) => response,

  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("agritwin_token");
    }

    return Promise.reject(error);
  }
);

export default api;
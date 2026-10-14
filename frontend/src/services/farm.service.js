import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("agritwin_token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (config.data instanceof FormData) {
      delete config.headers["Content-Type"];
    } else {
      config.headers["Content-Type"] = "application/json";
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,

  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("agritwin_token");
    }

    return Promise.reject(error);
  }
);

export const createFarm = async (data) => {
  const response = await api.post("/farms/create-farm", data);

  return response.data;
};

// =========================================================
// GET MY FARMS
// =========================================================

export const getMyFarms = async () => {
  const response = await api.get("/farms/get-all-farms");

  return response.data;
};

// =========================================================
// GET SINGLE FARM
// =========================================================

export const getFarmById = async (farmId) => {
  const response = await api.get(`/farms/${farmId}`);

  return response.data;
};

// =========================================================
// UPDATE FARM
// =========================================================

export const updateFarm = async (farmId, data) => {
  const response = await api.put(`/farms/update-farm/${farmId}`, data);

  return response.data;
};

// =========================================================
// DELETE FARM
// =========================================================

export const deleteFarm = async (farmId) => {
  const response = await api.delete(`/farms/delete-farm/${farmId}`);

  return response.data;
};
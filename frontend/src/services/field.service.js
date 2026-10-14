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

export const createField = async (formData) => {
  const response = await api.post(
    "/fields/create-field",
    formData
  );

  return response.data;
};

export const getMyFields = async () => {
  const response = await api.get(
    "/fields/get-my-fields"
  );

  return response.data;
};

export const getMyFieldsByFarmId = async (farmId) => {
  if (!farmId) {
    throw new Error("Farm ID is required");
  }

  const response = await api.get(
    `/fields/get-my-fields/${farmId}`
  );

  return response.data;
};

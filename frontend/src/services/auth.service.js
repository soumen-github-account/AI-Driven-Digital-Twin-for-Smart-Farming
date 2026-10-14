
import api from "./api";

export const loginUser = async (data) => {
  const response = await api.post("/auth/login", data);

  return response.data;
};

export const registerUser = async (data) => {
  const response = await api.post("/auth/register", data);

  return response.data;
};

export const googleLogin = () => {
  const baseURL = api.defaults.baseURL;

  window.location.href = `${baseURL}/auth/google`;
};

export const getCurrentUser = async () => {
  const response = await api.get("/users/me");
  console.log(response.data)
  return response.data;
};
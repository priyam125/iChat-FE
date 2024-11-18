import { apiClient } from ".";

export const loginUser = (data) => {
  return apiClient.post("/auth/login", data);
};

export const registerUser = (data) => {
  return apiClient.post("/auth/register", data);
};

export const getUserInfo = () => {
  return apiClient.get("/auth/user-info");
};
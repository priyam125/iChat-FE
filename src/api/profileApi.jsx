import { apiClient } from ".";

export const updateProfile = (data) => {
    return apiClient.post("/profile/update-profile", data);
};

export const addProfileImage = (data) => {
  return apiClient.post("/profile/add-profile-image", data);
};
import { apiClient } from ".";

export const updateProfile = (data) => {
    return apiClient.post("/user/update-profile", data);
};
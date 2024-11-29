import { apiClient } from ".";

export const getAllMessages = (data) => {
    return apiClient.post("/messages/get-messages", data);
};

import { apiClient } from ".";

export const searchContactsApi = (data) => {
    console.log("data", data);
    return apiClient.post("/conatcts/search", {data});
};

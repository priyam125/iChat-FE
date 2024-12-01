import { apiClient } from ".";

export const searchContactsApi = (data) => {
    console.log("data", data);
    return apiClient.post("/conatcts/search", {data});
};

export const getContactsForDmListApi = () => {
    return apiClient.get("/conatcts/get-contacts-for-dm");
}

export const getAllContactsApi = () => {
  return apiClient.get("/conatcts/get-all-contacts");
}

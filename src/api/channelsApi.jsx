import { apiClient } from ".";

export const createChannelApi = (data) => {
    console.log("data", data);
    return apiClient.post("channel/create-channel", {data});
};

export const getChannelsApi = () => {
    return apiClient.get("channel/get-channels");
};


import axios from "axios";
import { SERVER_URL } from "../utils/constants";
// import { LocalStorage } from "../utils";

// Create an Axios instance for API requests
export const apiClient = axios.create({
  baseURL: SERVER_URL,
  withCredentials: true,
  timeout: 6000,
});
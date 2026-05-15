// src/services/axios.js
import axios from "axios";
import { refreshTokenURL } from "./apiEndpoints";
import { router } from "../router";

const api = axios.create({ withCredentials: true });

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;

    // Handle both 401 and 403 on the original request
    const isAuthError =
      error.response?.status === 401 || error.response?.status === 403;

    if (isAuthError && !original._retry) {
      original._retry = true;
      try {
        // CRUCIAL: Use vanilla axios
        await axios.post(refreshTokenURL, {}, { withCredentials: true });

        // Retry original request with the clean 'api' instance
        return api(original);
      } catch (err) {
        router.navigate("/");
        // Handles refresh failure safely without looping
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  },
);

export default api;

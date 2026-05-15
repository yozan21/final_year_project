// src/services/axios.js
import axios from "axios";
import { refreshTokenURL } from "./apiEndpoints";
import { router } from "../router";

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve();
    }
  });
  failedQueue = [];
};

const api = axios.create({ withCredentials: true });

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;

    // Handle both 401 and 403 on the original request
    const isAuthError =
      error.response?.status === 401 || error.response?.status === 403;
    if (isRefreshing) {
      // queue the request until refresh is done
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      })
        .then(() => {
          return api(original);
        })
        .catch((err) => Promise.reject(err));
    }

    if (isAuthError && !original._retry && !isRefreshing) {
      original._retry = true;
      isRefreshing = true;
      try {
        // Retry original request with the clean 'api' instance
        // CRUCIAL: Use vanilla axios
        await axios.post(refreshTokenURL, {}, { withCredentials: true });

        //Resolve all the queued requests
        processQueue(null);
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

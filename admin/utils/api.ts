import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000/api/v1",
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const apiKey = process.env.X_API_KEY;
    if (apiKey) {
      config.headers["x-api-key"] = apiKey;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

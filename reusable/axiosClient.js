import axios from "axios";

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000,
});

const getToken = () => {
  const token = localStorage.getItem("token");
  return token ? token : null;
};

axiosClient.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === "ECONNABORTED") {
      console.error("⏳ Request timeout! No response after 5 seconds.");
      return Promise.reject(new Error("Request timeout! Please try again."));
    }
    if (error.response) {
      const { status, data } = error.response;
      console.error(`🚨 API Error ${status}:`, data.message || data);

      if (status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }

      return Promise.reject(new Error(data.message || "Something went wrong!"));
    }

    return Promise.reject(new Error("Network error! Please check your connection."));
  }
);

export default axiosClient;

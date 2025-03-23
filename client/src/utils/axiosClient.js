import axios from "axios";

const apiv1 = axios.create({
  baseURL: process.env.SERVER_URL || "http://localhost:3000/api/v1",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000,
});

// axiosClient.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.code === "ECONNABORTED") {
//       console.error("⏳ Request timeout! No response after 5 seconds.");
//       return Promise.reject(new Error("Request timeout! Please try again."));
//     }
//     if (error.response) {
//       const { status, data } = error.response;
//       console.error(`🚨 API Error ${status}:`, data.message || data);

//       // if (status === 401) {
//       //   localStorage.removeItem("token");
//       //   window.location.href = "/login";
//       // }

//       return Promise.reject(new Error(data.message || "Something went wrong!"));
//     }

//     return Promise.reject(new Error("Network error! Please check your connection."));
//   }
// );

export default apiv1;

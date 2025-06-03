import axios from "axios";

// Create an axios instance
const axiosInstance = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Request Interceptor: Add Token Before Every Request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["token"] = token; 
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Response Interceptor: Handle Expired Token & Redirect
axiosInstance.interceptors.response.use(
  (response) => response, 
  (error) => {
    if (error.response && error.response.status === 401) {
      // Remove token from localStorage
      localStorage.removeItem("token");

      // Redirect to login page
      window.location.href = "/login"; // Adjust based on your frontend route
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;

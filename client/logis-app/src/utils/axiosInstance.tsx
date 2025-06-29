import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // ✅ send cookies with requests
});

// ❌ Remove token injection
axiosInstance.interceptors.request.use(
  (config) => {
    // ✅ Just ensure cookies are sent
    config.withCredentials = true;
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Still useful to catch 401
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // No need to remove token, but can redirect to login
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
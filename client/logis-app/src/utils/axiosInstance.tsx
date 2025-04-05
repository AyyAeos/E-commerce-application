import axios from 'axios';

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080', // your base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to headers before every request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Get the token from localStorage
    if (token) {
      config.headers['token'] = `${token}`; // Attach token to the Authorization header
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;

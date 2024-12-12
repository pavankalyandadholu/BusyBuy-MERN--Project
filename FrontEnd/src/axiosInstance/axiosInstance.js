import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api`, // Replace with your backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token automatically to headers for protected routes
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Adjust as needed
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;

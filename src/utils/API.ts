import axios from 'axios';

// Create an instance of axios with predefined config
const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/', // Fallback to localhost if env is not found
});

// Add a request interceptor to include Authorization token
API.interceptors.request.use(
  (config) => {
    // Retrieve token from localStorage
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = user?.token;

    // Ensure headers object exists
    config.headers = config.headers || {};

    if (token) {
      // Set the Authorization header for every request
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default API;

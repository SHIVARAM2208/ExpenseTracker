import axios from 'axios';

// Configure axios instance with default settings
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  withCredentials: true, // Automatically sends cookies with every request
  headers: {
    'Content-Type': 'application/json',
  }
});

// Request interceptor (optional for logging)
api.interceptors.request.use(
  (config) => {
    // You can add request logging here if needed
    console.log('Request:', config.method, config.url);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor (handles errors globally)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Handle session expiration (401 Unauthorized)
      if (error.response.status === 401) {
        console.error('Session expired or unauthorized');
        // Optionally redirect to login page
        window.location.href = '/login';
      }
      
      // Handle other errors
      console.error('API Error:', error.response.status, error.response.data);
    } else {
      console.error('Network Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default api;

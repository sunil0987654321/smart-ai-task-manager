import axios from 'axios';
import toast from 'react-hot-toast';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api', // Backend base URL
});

// Add a request interceptor to include the token in headers
api.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor for global error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.message === 'Network Error') {
      // Trigger a custom event for the global network error modal
      window.dispatchEvent(new CustomEvent('network-error'));
    } else {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || 'Something went wrong';
      toast.error(message);
    }
    return Promise.reject(error);
  }
);

export default api;

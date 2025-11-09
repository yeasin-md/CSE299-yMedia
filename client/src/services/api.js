import axios from 'axios';

const API_BASE_URL = 'http://localhost:4000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.token = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },
};

// Video API
export const videoAPI = {
  getAllVideos: async () => {
    const response = await api.get('/api/videos/');
    return response.data;
  },
  getVideo: async (id) => {
    const response = await api.get(`/api/videos/find/${id}`);
    return response.data;
  },
  getBanners: async () => {
    const response = await api.get('/api/videos/banners');
    return response.data;
  },
  getCategories: async () => {
    const response = await api.get('/api/videos/cats');
    return response.data;
  },
};

export default api;


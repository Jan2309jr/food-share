import axios from 'axios';

const API_URL = 'http://localhost:4000';

const api = axios.create({
  baseURL: API_URL,
});

// Add a request interceptor to include the JWT token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('food-share-token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const auth = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  logout: () => {
    localStorage.removeItem('food-share-token');
    localStorage.removeItem('food-share-user');
  },
};

export const food = {
  getAll: (filters) => api.get('/food', { params: filters }),
  create: (data) => api.post('/food', data),
  claim: (id) => api.patch(`/food/${id}/claim`),
  getMyListings: () => api.get('/food/my-listings'),
  getMyClaims: () => api.get('/food/my-claims'),
};

export default api;

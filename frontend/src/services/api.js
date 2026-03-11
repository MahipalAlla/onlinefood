import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
};

export const restaurantAPI = {
  getAll: () => api.get('/restaurants'),
  getById: (id) => api.get(`/restaurants/${id}`),
  getMenu: (id) => api.get(`/restaurants/${id}/menu`),
  search: (query) => api.get(`/restaurants/search?query=${query}`),
};

export const orderAPI = {
  create: (data) => api.post('/orders', data),
  getUserOrders: () => api.get('/orders'),
  getById: (id) => api.get(`/orders/${id}`),
  updateStatus: (id, status) => api.put(`/orders/${id}/status?status=${status}`),
};

export const paymentAPI = {
  createIntent: (data) => api.post('/payments/create-intent', data),
  confirm: (orderId, paymentId) => api.post(`/payments/confirm?orderId=${orderId}&paymentId=${paymentId}`),
};

export default api;

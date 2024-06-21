// src/api.js
import axios from 'axios';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axios.defaults.withCredentials = true
const api = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL || 'http://127.0.0.1:8000/api',

});

// Add a request interceptor to include the token in headers if available
api.interceptors.request.use(config => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export const login = async (phone, password) => {
  const response = await api.post('/login', { phone, password });
  return response.data;
};

export const logout = async () => {
  const response = await api.post('/logout');
  return response.data;
};

export const fetchPlaygrounds = async () => {
  const response = await api.get('/my-playgrounds');
  return response.data.playgrounds.map(playground => ({
    ...playground,
    images: typeof playground.images === 'string' ? JSON.parse(playground.images) : playground.images
  }));
};

export const updatePlayground = async (id, data) => {
  const response = await api.put(`/playground/${id}`, data);
  return response.data;
};

export default api;

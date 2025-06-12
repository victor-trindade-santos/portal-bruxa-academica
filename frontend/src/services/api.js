import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
console.log('API_BASE_URL no frontend:', API_BASE_URL);

const api = axios.create({
  baseURL: API_BASE_URL, // <--- ESTE É O PONTO CRÍTICO!
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Se você usa cookies/sessões
});

// Interceptor para adicionar o token nas requisições
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');  // Recupera o token do localStorage
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;  // Adiciona o token no cabeçalho
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});


export default api;

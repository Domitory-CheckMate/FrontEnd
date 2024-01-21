import axios from 'axios';

export const baseAxios = axios.create({
  baseURL: 'https://checkmate-domitory.shop/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Authorization: '',
  },
});

export const authAxios = axios.create({
  baseURL: 'https://checkmate-domitory.shop/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Authorization: '',
  },
});

authAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

import axios from 'axios';
import {
  getAccessToken,
  getRefreshToken,
  setAccessToken,
  setRefreshToken,
} from './manageLocalStorage';

export const baseAxios = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Authorization: '',
  },
});

export const authAxios = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Authorization: '',
  },
});

authAxios.interceptors.request.use(
  (config) => {

    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

authAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const accessToken = getAccessToken();
      const refreshToken = getRefreshToken();
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/member/reissue`,
        {
          accessToken: accessToken,
          refreshToken: refreshToken,
        },
      );
      if (res.status === 200) {
        setAccessToken(res.data.accessToken);
        setRefreshToken(res.data.refreshToken);
        return authAxios(originalRequest);
      }
    }

    return Promise.reject(error);
  },
);

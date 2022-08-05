import axios from 'axios';

import { TOKENEXPIRED } from '@routes';

const BASE_URL = process.env.REACT_APP_BASE_URL;

const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('@TOKEN');
  config.headers.common.Authorization = token ? `Bearer ${token}` : '';
  return config;
});

api.interceptors.response.use(
  (response) =>
    // Do something with response data
    response,
  async (error) => {
    const originalRequest = error.config;
    const requestStatus = error.response.status;
    const refreshTokenExpired =
      error?.response?.data?.refreshTokenExpired || false;

    if (requestStatus === 401 && !refreshTokenExpired) {
      const refreshToken = localStorage.getItem('@REFRESH_TOKEN');
      const response = await api.post('/refresh-token', {
        refreshToken,
      });
      const { token } = response.data;

      localStorage.setItem('@TOKEN', token);

      originalRequest.headers.Authorization = token ? `Bearer ${token}` : '';
      return api.request(originalRequest);
    }

    if (requestStatus === 401 && refreshTokenExpired) {
      localStorage.clear('@TOKEN');
      localStorage.clear('@TEACHER');
      window.location = TOKENEXPIRED;
    }

    return Promise.reject(error);
  }
);

export default api;

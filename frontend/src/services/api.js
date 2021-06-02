import axios from 'axios';

import { TOKENEXPIRED } from '@routes';

const api = axios.create({
  baseURL: 'http://localhost:3333',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('@TOKEN');
  config.headers.common.Authorization = token ? `Bearer ${token}` : '';
  return config;
});

export default api;

api.interceptors.response.use(
  (response) =>
    // Do something with response data
    response,
  (error) => {
    if (error.response.status === 401) {
      localStorage.clear('@TOKEN');
      localStorage.clear('@TEACHER');
      window.location = TOKENEXPIRED;
    }
    return Promise.reject(error);
  }
);

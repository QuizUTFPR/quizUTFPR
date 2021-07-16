import axios from 'axios';

import { TOKENEXPIRED } from '@routes';

const BASE_URL = process.env.REACT_APP_BASE_URL;

console.log(BASE_URL);

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
  (error) => {
    if (error.response.status === 401) {
      localStorage.clear('@TOKEN');
      localStorage.clear('@TEACHER');
      window.location = TOKENEXPIRED;
    }
    return Promise.reject(error);
  }
);

export default api;

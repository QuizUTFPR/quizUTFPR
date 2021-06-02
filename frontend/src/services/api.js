import axios from 'axios';

import { TOKENEXPIRED } from '@routes';

const api = axios.create({
  baseURL: 'http://192.168.15.9:3333',
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
    // Do something with response error

    // You can even test for a response code
    // and try a new request before rejecting the promise
    if (error.response.status === 401) {
      localStorage.clear('@TOKEN');
      localStorage.clear('@TEACHER');
      window.location = TOKENEXPIRED;
    }
    return Promise.reject(error);
  }
);

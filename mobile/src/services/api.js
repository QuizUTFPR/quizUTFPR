import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { navigate } from './rootNavigation';

const ip = '10.0.2.2:3333';

const api = axios.create({
  baseURL: `http://${ip}`,
});

api.interceptors.request.use(async (config) => {
  const data = await AsyncStorage.getItem('@TOKEN');
  if (data) {
    // const token = data != null ? JSON.parse(data) : null;

    config.headers.common.Authorization = data ? `Bearer ${data}` : '';
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const requestStatus = error.response.status;
    // Do something with response error
    if (requestStatus === 401) {
      const refreshToken = await AsyncStorage.getItem('@REFRESH_TOKEN');

      const response = await api.post('/refresh-token', {
        refresh_token: JSON.parse(refreshToken),
      });
      const { token } = response.data;
      console.log('refresh token', response);
      await AsyncStorage.setItem('@TOKEN', token);

      originalRequest.headers.Authorization = token ? `Bearer ${token}` : '';
      return api.request(originalRequest);
    }

    if (requestStatus === 403) {
      navigate('Logout');
    } else {
      return Promise.reject(error);
    }
  }
);

export default api;

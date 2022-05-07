import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '@env';
import { navigate } from './rootNavigation';

const api = axios.create({
  baseURL: API_URL,
});

// USADO PARA CANCELAR REQUEST QUANDO COMPONENTE DESMONTAR
api.CancelToken = axios.CancelToken;
api.isCancel = axios.isCancel;

api.interceptors.request.use(async (config) => {
  const data = await AsyncStorage.getItem('@TOKEN');
  if (data) {
    // const token = data != null ? JSON.parse(data) : null;
    config.headers.common.Authorization = data
      ? `Bearer ${JSON.parse(data)}`
      : '';
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error?.config || error;
    const requestStatus = error?.response?.status || null;
    const refreshTokenExpired =
      error?.response?.data?.refreshTokenExpired || false;

    console.log('refreshTokenExpired', { ...error });

    if (requestStatus === 401 && !refreshTokenExpired) {
      const refreshToken = await AsyncStorage.getItem('@REFRESH_TOKEN');
      const response = await api.post('/refresh-token', {
        refreshToken: JSON.parse(refreshToken),
      });
      const { token } = response.data;
      await AsyncStorage.setItem('@TOKEN', token);

      originalRequest.headers.Authorization = token ? `Bearer ${token}` : '';
      return api.request(originalRequest);
    }

    if (requestStatus === 401 && refreshTokenExpired) {
      navigate('Logout');
    }

    return Promise.reject(error);
  }
);

export default api;

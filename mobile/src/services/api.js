import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ip = 'dacom.cm.utfpr.edu.br:17088';

const api = axios.create({
  baseURL: `http://${ip}`,
});

api.interceptors.request.use(async (config) => {
  const data = await AsyncStorage.getItem('@student');
  if (data) {
    const parsedData = data != null ? JSON.parse(data) : null;
    config.headers.common.Authorization = parsedData.token
      ? `Bearer ${parsedData.token}`
      : '';
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Do something with response error
    if (error.response.status === 401) {
      AsyncStorage.clear('@student');
    }

    return Promise.reject(error);
  }
);

export default api;

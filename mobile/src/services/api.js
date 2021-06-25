import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
  baseURL: 'http://10.0.2.2:3333',
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

axios.interceptors.response.use(
  (response) =>
    // Do something with response data
    response,
  (error) =>
    // Do something with response error
    Promise.reject(error)
);

export default api;

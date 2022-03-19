import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '@api';

export const StudentAuthContext = createContext();

const StudentAuth = ({ children }) => {
  const initialValue = {
    student: null,
    token: null,
  };

  const [isLoggedIn, setLoggedIn] = useState(false);
  const [studentInfo, setStudentInfo] = useState(initialValue);
  const studentStorageItem = '@student';
  const tokenStorageItem = '@TOKEN';
  const refreshStorageItem = '@REFRESH_TOKEN';

  const getOnLocalStorage = async (key) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
      console.warn(error);
      return error;
    }
  };

  const saveOnLocalStorage = async (key, values) => {
    try {
      const jsonValue = JSON.stringify(values);
      await AsyncStorage.setItem(key, jsonValue);
      return true;
    } catch (error) {
      console.warn(error);
      return error;
    }
  };

  const register = async (values) => {
    try {
      const { name, email, password } = values;
      const response = await api.post('/student/register', {
        name,
        email,
        password,
      });

      const { student, token, refreshToken: RefreshToken } = response.data;

      const studentValues = {
        student,
        token,
      };

      setStudentInfo(studentValues);
      setLoggedIn(true);
      saveOnLocalStorage(studentStorageItem, { studentValues });
      saveOnLocalStorage(tokenStorageItem, token);
      saveOnLocalStorage(refreshStorageItem, RefreshToken);
      return response;
    } catch (error) {
      const err = {
        status: error.response.status,
        message: error.response.data.response,
      };
      throw err;
    }
  };

  const login = async (values) => {
    try {
      const { email, password } = values;
      const response = await api.post('/student/login', { email, password });

      const { student, token, refreshToken: RefreshToken } = response.data;
      const studentValues = {
        student,
        token,
      };
      setStudentInfo(studentValues);
      saveOnLocalStorage(studentStorageItem, studentValues);
      saveOnLocalStorage(tokenStorageItem, token);
      saveOnLocalStorage(refreshStorageItem, RefreshToken);

      setLoggedIn(true);
      return response;
    } catch (error) {
      console.log('ERROR', error.response.data.response);
      return {
        status: error.response.status,
        message: error.response.data.response,
      };
    }
  };

  const logout = async () => {
    try {
      setStudentInfo(initialValue);
      setLoggedIn(false);
      await AsyncStorage.clear();
    } catch (error) {
      // console.warn(error);
    }
  };

  return (
    <StudentAuthContext.Provider
      value={{
        studentInfo,
        setStudentInfo,
        login,
        logout,
        register,
        getOnLocalStorage,
        studentStorageItem,
        isLoggedIn,
        setLoggedIn,
        initialValue,
      }}
    >
      {children}
    </StudentAuthContext.Provider>
  );
};

StudentAuth.propTypes = {
  children: PropTypes.node.isRequired,
};

export default StudentAuth;

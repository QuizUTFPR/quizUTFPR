import React, { createContext, useState, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '@api';

export const StudentAuthContext = createContext();
const initialValue = {
  student: null,
  token: null,
};

const StudentAuth = ({ children }) => {
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

  const register = useCallback(async ({ name, email }) => {
    try {
      const response = await api.post('/student/register', {
        name,
        email,
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
      console.log(error);
      const err = {
        status: error.response.status,
        message: error.response.data.response,
      };
      throw err;
    }
  }, []);

  const login = useCallback(async (values) => {
    try {
      const { name, email, picture, isLocalImage } = values;

      const response = await api.post('/student/login', {
        name,
        email,
        picture,
        isLocalImage,
      });

      const {
        student,
        token,
        refreshToken: RefreshToken,
        isFirstLogin,
      } = response.data;

      const studentValues = {
        student,
        token,
        isFirstLogin,
      };

      setStudentInfo(studentValues);
      saveOnLocalStorage(studentStorageItem, studentValues);
      saveOnLocalStorage(tokenStorageItem, token);
      saveOnLocalStorage(refreshStorageItem, RefreshToken);

      setLoggedIn(true);
      return response;
    } catch (error) {
      if (error.response) {
        console.log(error.response);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log(error.message);
      }
      return {
        status: error.response.status,
        message: error.response.data.response,
      };
    }
  }, []);

  const update = useCallback(
    async (values) => {
      try {
        const { name, avatar } = values;

        const { data } = await api.post('/student/update', {
          id: studentInfo.student.id,
          name,
          avatar,
        });

        const isFirstLogin = !data.name;

        const studentValues = {
          ...studentInfo,
          student: {
            ...studentInfo.student,
            name,
            image: data.image,
          },
          isFirstLogin,
        };

        setStudentInfo(studentValues);
        saveOnLocalStorage(studentStorageItem, studentValues);

        return data;
      } catch (error) {
        console.log('error', error.response, { ...error });

        return {
          status: error.response.status,
          message: error.response.data.message,
        };
      }
    },
    [studentInfo]
  );

  const logout = async () => {
    try {
      setStudentInfo(initialValue);
      setLoggedIn(false);
      await AsyncStorage.clear();
    } catch (error) {
      // console.warn(error);
    }
  };

  const returndedValues = useMemo(
    () => ({
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
      update,
    }),
    [isLoggedIn, login, register, studentInfo, update]
  );

  return (
    <StudentAuthContext.Provider value={returndedValues}>
      {children}
    </StudentAuthContext.Provider>
  );
};

StudentAuth.propTypes = {
  children: PropTypes.node.isRequired,
};

export default StudentAuth;

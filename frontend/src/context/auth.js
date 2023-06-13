/* eslint-disable import/no-unresolved */
import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import api from '@api';

export const AuthContext = createContext();

export const initialValue = {
  teacher: null,
  token: null,
};

const Auth = ({ children }) => {
  const [teacherInfo, setTeacherInfo] = useState(initialValue);

  const login = async (data) => {
    if (!data) return 404;

    try {
      const response = await api.post('/teacher/login', data);

      setTeacherInfo({
        token: response.data.token,
        teacher: response.data.teacher,
      });

      localStorage.setItem('@TOKEN', response.data.token);
      localStorage.setItem('@TEACHER', JSON.stringify(response.data.teacher));
      localStorage.setItem('@REFRESH_TOKEN', response.data.refreshToken);

      return { response };
    } catch (err) {
      return err;
    }
  };

  const logout = () => {
    localStorage.clear('@TOKEN');
    localStorage.clear('@TEACHER');
    setTeacherInfo(initialValue);
  };

  return (
    <AuthContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{ teacherInfo, setTeacherInfo, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

Auth.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Auth;

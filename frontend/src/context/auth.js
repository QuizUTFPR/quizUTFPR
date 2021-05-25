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

  const login = async (email, password) => {
    if (!email || !password) return 'Erro';

    try {
      const { data } = await api.post('/login', { email, password });

      setTeacherInfo({
        token: data.token,
        teacher: data.teacher,
      });

      api.defaults.headers.Authorization = `Bearer ${data.token}`;
      localStorage.setItem('@TOKEN', data.token);
      localStorage.setItem('@TEACHER', JSON.stringify(data.teacher));

      return 200;
    } catch (err) {
      console.log(err);
      return err;
    }
  };

  const logout = () => {
    setTeacherInfo(initialValue);
    localStorage.clear('@TOKEN');
    localStorage.clear('@TEACHER');
  };

  return (
    <AuthContext.Provider
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

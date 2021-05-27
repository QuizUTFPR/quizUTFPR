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

      localStorage.setItem('@TOKEN', data.token);
      localStorage.setItem('@TEACHER', JSON.stringify(data.teacher));

      return 200;
    } catch (err) {
      console.log(err);
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

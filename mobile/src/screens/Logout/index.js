import React, { useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import useStudentAuth from '@hook/useStudentAuth';

const Logout = () => {
  const { logout } = useStudentAuth();

  useEffect(() => {
    logout();
  });
  return <ActivityIndicator />;
};

export default Logout;

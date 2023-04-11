/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import useStudentAuth from '@hook/useStudentAuth';
import { navigationRef } from '../services/rootNavigation';

// THEME
import { navigationTheme } from '../styles/theme';

// ROUTES
import RoutesTokenNotRequired from './category/tokenNotRequired';
import RoutesTokenIsRequired from './category/tokenIsRequired';

const routes = () => {
  const {
    isLoggedIn,
    setStudentInfo,
    getOnLocalStorage,
    studentStorageItem,
    setLoggedIn,
  } = useStudentAuth();

  useEffect(() => {
    const fetchData = async () => {
      const studentData = await getOnLocalStorage(studentStorageItem);
      if (studentData) {
        setStudentInfo(studentData);
        setLoggedIn(true)
      } 
    };

    fetchData();
  }, [isLoggedIn]);

  return (
    <NavigationContainer theme={navigationTheme} ref={navigationRef}>
      {!isLoggedIn ? (
        <RoutesTokenNotRequired />
      ) : (
        <RoutesTokenIsRequired />
      )}
    </NavigationContainer>
  );
};

export default routes;

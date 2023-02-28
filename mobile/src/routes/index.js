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
    studentInfo,
    setStudentInfo,
    getOnLocalStorage,
    studentStorageItem,
  } = useStudentAuth();

  useEffect(() => {
    const fetchData = async () => {
      const studentData = await getOnLocalStorage(studentStorageItem);
      console.log(studentData, 'data');
      if (studentData) setStudentInfo(studentData);
    };

    fetchData();
  }, [isLoggedIn]);

  useEffect(() => {
    console.log('studentInfo', studentInfo);
    console.log('isLoggedIn', isLoggedIn);
  }, [studentInfo, isLoggedIn]);

  return (
    <NavigationContainer theme={navigationTheme} ref={navigationRef}>
      {!isLoggedIn &&
      studentInfo.token === null &&
      studentInfo.student === null ? (
        <RoutesTokenNotRequired />
      ) : (
        <RoutesTokenIsRequired />
      )}
    </NavigationContainer>
  );
};

export default routes;

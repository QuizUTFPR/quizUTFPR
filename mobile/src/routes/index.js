import React, { lazy, Suspense, useEffect } from 'react';
// import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Loading from '@components/Loading';
import useStudentAuth from '@hook/useStudentAuth';
import { navigationRef } from '../services/rootNavigation';

// HOOKS

// THEME
import { navigationTheme } from '../styles/theme';

// ROUTES
const RoutesTokenNotRequired = lazy(() =>
  import('./category/tokenNotRequired')
);
const RoutesTokenIsRequired = lazy(() => import('./category/tokenIsRequired'));

// const Stack = createStackNavigator();

// CRIAÇÃO DE UM CONTAINER CONTENDO A STACK DE NAVEGAÇÃO DO APP

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
      if (studentData) setStudentInfo(studentData);
    };

    fetchData();
  }, [isLoggedIn]);

  return (
    <Suspense fallback={<Loading />}>
      <NavigationContainer theme={navigationTheme} ref={navigationRef}>
        {!isLoggedIn &&
        studentInfo.token === null &&
        studentInfo.student === null ? (
          <RoutesTokenNotRequired />
        ) : (
          <RoutesTokenIsRequired />
        )}
      </NavigationContainer>
    </Suspense>
  );
};

export default routes;

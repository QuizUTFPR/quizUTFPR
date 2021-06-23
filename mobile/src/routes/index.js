import React, { lazy, Suspense, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Loading from '@components/Loading';

// HOOKS
import useStudentAuth from '@hook/useStudentAuth';

// THEME
import { navigationTheme } from '../styles/theme';

// ROUTES
const RoutesTokenNotRequired = lazy(() =>
  import('./category/tokenNotRequired')
);
const RoutesTokenIsRequired = lazy(() => import('./category/tokenIsRequired'));

const Stack = createStackNavigator();

// CRIAÇÃO DE UM CONTAINER CONTENDO A STACK DE NAVEGAÇÃO DO APP

const routes = () => {
  const { studentInfo, setStudentInfo, getOnLocalStorage } = useStudentAuth();

  useEffect(() => {
    const fetchData = async () => {
      const studentData = await getOnLocalStorage();
      if (studentData) setStudentInfo(studentData);
    };

    fetchData();
  }, []);

  return (
    <Suspense fallback={<Loading />}>
      <NavigationContainer theme={navigationTheme}>
        <Stack.Navigator>
          {studentInfo.token === null && studentInfo.student === null ? (
            <>
              <Stack.Screen
                options={{ headerShown: false }}
                name="InitialScreen"
                component={RoutesTokenNotRequired}
              />
            </>
          ) : (
            <>
              <Stack.Screen
                options={{ headerShown: false }}
                name="Home"
                component={RoutesTokenIsRequired}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </Suspense>
  );
};

export default routes;

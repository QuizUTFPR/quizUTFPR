import React, { lazy, Suspense } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Loading from '@components/Loading';

// PAGES
const InitialScreen = lazy(() => import('@pages/InitialScreen'));
const Login = lazy(() => import('@pages/Login'));
const Register = lazy(() => import('@pages/Register'));
const Question = lazy(() => import('@pages/Question'));

const Stack = createStackNavigator();

// CRIAÇÃO DE UM CONTAINER CONTENDO A STACK DE NAVEGAÇÃO DO APP

function Routes() {
  return (
    <Suspense fallback={<Loading />}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {/* <Stack.Screen name="InitialScreen" component={InitialScreen} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} /> */}
          <Stack.Screen name="Question" component={Question} />
        </Stack.Navigator>
      </NavigationContainer>
    </Suspense>
  );
}

export default Routes;

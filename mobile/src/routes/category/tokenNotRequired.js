import React, { lazy, Suspense } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Loading from '@components/Loading';

// PAGES
const InitialScreen = lazy(() => import('@pages/InitialScreen2'));
const Login = lazy(() => import('@pages/Login'));
const Register = lazy(() => import('@pages/Register'));

// STACK
const Stack = createStackNavigator();

const DontHaveTokenStack = () => (
  <Suspense fallback={<Loading />}>
    <Stack.Navigator
      initialRouteName="InitialScreen"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="InitialScreen" component={InitialScreen} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  </Suspense>
);

export default DontHaveTokenStack;

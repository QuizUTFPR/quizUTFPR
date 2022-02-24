import React, { lazy, Suspense } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Loading from '@components/Loading';

// Screens
const InitialScreen = lazy(() => import('@screens/InitialScreen'));
const Login = lazy(() => import('@screens/Login'));
const Register = lazy(() => import('@screens/Register'));

// STACK
const Stack = createStackNavigator();

const DontHaveTokenStack = () => (
  <Suspense fallback={<Loading />}>
    <Stack.Navigator
      initialRouteName="InitialScreen"
      screenOptions={{
        headerShown: false,
        presentation: 'transparentModal',
      }}
    >
      <Stack.Screen name="InitialScreen" component={InitialScreen} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  </Suspense>
);

export default DontHaveTokenStack;

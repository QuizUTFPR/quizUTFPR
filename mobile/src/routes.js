import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

// PAGES
const InitialScreen = React.lazy(() => import('@pages/InitialScreen'));
const Login = React.lazy(() => import('@pages/Login'));
const Register = React.lazy(() => import('@pages/Register'));

const Stack = createStackNavigator();

// CRIAÇÃO DE UM CONTAINER CONTENDO A STACK DE NAVEGAÇÃO DO APP

function Routes() {
  return (
    <NavigationContainer>
      <React.Suspense fallback={null}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="InitialScreen" component={InitialScreen} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
        </Stack.Navigator>
      </React.Suspense>
    </NavigationContainer>
  );
}

export default Routes;

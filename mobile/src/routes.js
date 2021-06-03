import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

// PAGES
import InitialScreen from '@pages/InitialScreen';
import Login from '@pages/Login';
import Register from '@pages/Register';

const Stack = createStackNavigator();

// CRIAÇÃO DE UM CONTAINER CONTENDO A STACK DE NAVEGAÇÃO DO APP

function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="InitialScreen" component={InitialScreen} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;

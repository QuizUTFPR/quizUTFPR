import * as React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

// PAGES
import Home from './pages/Home/index.js';
const Stack = createStackNavigator();

// CRIAÇÃO DE UM CONTAINER CONTENDO A STACK DE NAVEGAÇÃO DO APP

function Routes() {
  return (
    <NavigationContainer>
    <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  </NavigationContainer>
  );
}

export default Routes;

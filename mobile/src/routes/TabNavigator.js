import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// STACKS
import HomeStack from './stacks/home';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeStack} />
    </Tab.Navigator>
  );
};

export default TabNavigator;

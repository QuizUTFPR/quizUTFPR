import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// COMPONENTS
import TabBar from '@components/TabBar';

// STACKS
import HomeStack from './stacks/home';

// ICONS
import Ionicons from '@expo/vector-icons/Ionicons';

// TAB CREATION
const Tab = createBottomTabNavigator();

const TabNavigator = () => (
  <Tab.Navigator tabBar={(props) => <TabBar {...props} />}>
    <Tab.Screen name="Home" component={HomeStack} />
  </Tab.Navigator>
);

export default TabNavigator;

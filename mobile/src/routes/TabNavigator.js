import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// COMPONENTS
import TabBar from '@components/TabBar';

// ICONS
import { Ionicons } from '@expo/vector-icons';

// STACKS
import HomeStack from './stacks/home';

// TAB CREATION
const Tab = createBottomTabNavigator();

const TabNavigator = () => (
  <Tab.Navigator tabBar={(props) => <TabBar {...props} />}>
    <Tab.Screen
      options={{
        Icon: Ionicons,
        name: 'md-home',
        size: 32,
      }}
      name="Home"
      component={HomeStack}
    />
  </Tab.Navigator>
);

export default TabNavigator;

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// COMPONENTS
import TabBar from '@components/TabBar';

// ICONS
import { Ionicons } from '@expo/vector-icons';

// STACKS
// import HomeStack from './stacks/home';
import HomeScreen from '@pages/Home';

// TAB CREATION
const Tab = createBottomTabNavigator();

const TabNavigator = () => (
  <Tab.Navigator
    tabBar={(props) => <TabBar {...props} />}
    screenOptions={{ headerShown: false }}
  >
    <Tab.Screen
      options={{
        Icon: Ionicons,
        name: 'md-home',
        size: 32,
      }}
      name="Teste do Tab"
      component={HomeScreen}
    />
  </Tab.Navigator>
);

export default TabNavigator;

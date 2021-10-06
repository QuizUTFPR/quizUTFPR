import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// COMPONENTS
import TabBar from '@components/TabBar';
import Header from '@components/HeaderHome';

// ICONS
import { Ionicons } from '@expo/vector-icons';

// STACKS
import TopTabStack from './TopTabNavigator';
// import HomeScreen from '@pages/Home';

// TAB CREATION
const Tab = createBottomTabNavigator();

const TabNavigator = () => (
  <Tab.Navigator tabBar={(props) => <TabBar {...props} />}>
    <Tab.Screen
      options={{
        Icon: Ionicons,
        name: 'md-home',
        size: 32,
        header: () => <Header />,
        tabBarLabel: 'Inicio',
      }}
      name="HomeStack"
      component={TopTabStack}
    />
  </Tab.Navigator>
);

export default TabNavigator;

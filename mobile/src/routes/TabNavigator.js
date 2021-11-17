import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// COMPONENTS
import TabBar from '@components/TabBar';
import HeaderHome from '@components/HeaderHome';

// ICONS
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

// STACKS
import SearchTag from '@screens/SearchTag';
import TopTabStack from './TopTabNavigator';

// TAB CREATION
const Tab = createBottomTabNavigator();

const TabNavigator = () => (
  <Tab.Navigator tabBar={(props) => <TabBar {...props} />}>
    <Tab.Screen
      options={{
        Icon: Ionicons,
        name: 'md-home',
        size: 32,
        header: () => <HeaderHome />,
        tabBarLabel: 'Inicio',
      }}
      name="HomeStack"
      component={TopTabStack}
    />
    <Tab.Screen
      options={{
        Icon: MaterialIcons,
        name: 'category',
        size: 32,
        header: () => <></>,
        tabBarLabel: 'Categoria',
      }}
      name="SearchTagScreen"
      component={SearchTag}
    />
  </Tab.Navigator>
);

export default TabNavigator;

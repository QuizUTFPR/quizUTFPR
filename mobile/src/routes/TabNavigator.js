import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// CONTEXT
import SearchQuizByTagProvider from '@context/SearchQuizByTag';

// COMPONENTS
import TabBar from '@components/TabBar';
import HeaderHome from '@components/Headers/HeaderHome';
import HeaderClassPage from '@components/Headers/HeaderClassPage';
import HeaderSearchTag from '@components/Headers/HeaderSearchTag';

// ICONS
import {
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';

// STACKS
import SearchTag from '@screens/SearchTag';
import ClassPage from '@screens/Class';
import TopTabStack from './TopTabNavigator';

// TAB CREATION
const Tab = createBottomTabNavigator();

const TabNavigator = () => (
  <SearchQuizByTagProvider>
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
          header: () => <HeaderSearchTag />,
          tabBarLabel: 'Categoria',
        }}
        name="SearchTagScreen"
        component={SearchTag}
      />
      <Tab.Screen
        options={{
          Icon: MaterialCommunityIcons,
          name: 'google-classroom',
          size: 32,
          header: () => <HeaderClassPage />,
          tabBarLabel: 'Turmas',
        }}
        name="ClassPage"
        component={ClassPage}
      />
    </Tab.Navigator>
  </SearchQuizByTagProvider>
);

export default TabNavigator;

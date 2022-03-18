import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// COMPONENTS
import TabBar from '@components/TabBar';
import HeaderHome from '@components/Headers/HeaderHome';
import HeaderClassPage from '@components/Headers/HeaderClassPage';

// ICONS
import {
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';

// STACKS
import SearchQuizByTagStack from '../stacks/SearchQuizByTagStack';
import QuizListTopTabStack from '../topTab/QuizListTopTabNavigator';
import ClassListTopTabStack from '../topTab/ClassListTopTabNavigator';

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
      component={QuizListTopTabStack}
    />
    <Tab.Screen
      options={{
        Icon: MaterialIcons,
        name: 'category',
        size: 32,
        headerShown: false,
        tabBarLabel: 'Categoria',
      }}
      name="SearchQuizByTagStack"
      component={SearchQuizByTagStack}
    />
    <Tab.Screen
      options={{
        Icon: MaterialCommunityIcons,
        name: 'google-classroom',
        size: 32,
        header: () => <HeaderClassPage />,
        tabBarLabel: 'Turmas',
      }}
      name="ClassListTopTabStack"
      component={ClassListTopTabStack}
    />
  </Tab.Navigator>
);

export default TabNavigator;

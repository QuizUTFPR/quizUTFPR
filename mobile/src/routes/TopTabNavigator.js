import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

// SCREEN
import HomeQuizInProgress from '@pages/HomeQuizInProgress';
import HomeAnsweredQuizzes from '@pages/HomeAnsweredQuizzes';

// TEMA
import theme from '../styles/theme';

// STACKS
import HomeStack from './stacks/home';

const TopTab = createMaterialTopTabNavigator();

const TopTabNavigator = () => (
  <TopTab.Navigator
    screenOptions={{
      tabBarScrollEnabled: true,
      tabBarStyle: {
        borderBottomEndRadius: 30,
        borderBottomRightRadius: 30,
        borderBottomLeftRadius: 30,
        borderBottomStartRadius: 30,
      },
      tabBarActiveTintColor: theme.color.purple,
      tabBarInactiveTintColor: theme.color.grey,

      tabBarIndicatorStyle: {
        backgroundColor: 'transparent',
      },
      tabBarItemStyle: {
        width: 170,
        height: 60,
      },
      tabBarLabelStyle: {
        fontFamily: 'PoppinsBold',
        fontSize: theme.fontSize,
        overflow: 'hidden',
      },
    }}
  >
    <TopTab.Screen
      name="Dashboard"
      component={HomeStack}
      options={{
        tabBarLabel: 'Quizzes',
      }}
    />
    <TopTab.Screen
      name="QuizzesInProgress"
      component={HomeQuizInProgress}
      options={{ tabBarLabel: 'Não Finalizados' }}
    />
    <TopTab.Screen
      name="AnsweredQuizzes"
      component={HomeAnsweredQuizzes}
      options={{ tabBarLabel: 'Respondidos' }}
    />
    <TopTab.Screen
      name="AnsweredQuizzes4"
      component={HomeAnsweredQuizzes}
      options={{ tabBarLabel: 'Respondidos' }}
    />
  </TopTab.Navigator>
);

export default TopTabNavigator;

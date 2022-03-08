import React, { lazy, Suspense } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Loading from '@components/Loading';

// THEME
import theme from '@theme';

// Screens
const InfoOfClass = lazy(() => import('@screens/Class/Info'));
const QuizzesOfClass = lazy(() => import('@screens/Class/Quizzes'));
const MessagesOfClass = lazy(() => import('@screens/Class/Messages'));

// STACK
const TopTab = createMaterialTopTabNavigator();

const SearchQuizByTagTopTab = () => (
  <Suspense fallback={<Loading />}>
    <TopTab.Navigator
      style={{ backgroundColor: 'white' }}
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
          fontSize: theme.fontSize.normal,
          overflow: 'hidden',
        },
      }}
    >
      <TopTab.Screen
        name="InfoOfClass"
        component={InfoOfClass}
        options={{
          tabBarLabel: 'Info',
        }}
      />
      <TopTab.Screen
        name="QuizzesOfClass"
        component={QuizzesOfClass}
        options={{
          tabBarLabel: 'Quizzes',
        }}
      />
      <TopTab.Screen
        name="MessagesOfClass"
        component={MessagesOfClass}
        options={{
          tabBarLabel: 'Mensagens',
        }}
      />
    </TopTab.Navigator>
  </Suspense>
);

export default SearchQuizByTagTopTab;

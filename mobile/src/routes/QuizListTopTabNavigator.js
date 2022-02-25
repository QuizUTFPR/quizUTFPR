import React, { lazy, Suspense } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Loading from '@components/Loading';

// TEMA
import theme from '../styles/theme';

// SCREEN
const HomeAnsweredQuizzes = lazy(() =>
  import('@screens/HomeScreens/Screens/HomeAnsweredQuizzes')
);
const HomeQuizInProgress = lazy(() =>
  import('@screens/HomeScreens/Screens/HomeQuizInProgress')
);

const HomeRecentQuizzes = lazy(() =>
  import('@screens/HomeScreens/Screens/HomeRecentQuizzes')
);

const FavoriteQuizzes = lazy(() =>
  import('@screens/HomeScreens/Screens/HomeFavoriteQuizzes')
);

const HomeQuizzes = lazy(() =>
  import('@screens/HomeScreens/Screens/HomeQuizzes')
);

// STACKS
const TopTab = createMaterialTopTabNavigator();

const TopTabNavigator = () => (
  <Suspense fallback={<Loading />}>
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
        name="QuizzesInProgress"
        component={HomeQuizInProgress}
        options={{ tabBarLabel: 'Em Andamento', headerShown: false }}
      />
      <TopTab.Screen
        name="FavoriteQuizzes"
        component={FavoriteQuizzes}
        options={{ tabBarLabel: 'Favoritos' }}
      />
      <TopTab.Screen
        name="HomeRecentQuizzes"
        component={HomeRecentQuizzes}
        options={{
          tabBarLabel: 'Novos',
        }}
      />
      <TopTab.Screen
        name="HomeQuizzes"
        component={HomeQuizzes}
        options={{
          tabBarLabel: 'Quizzes',
        }}
      />
      <TopTab.Screen
        name="AnsweredQuizzes"
        component={HomeAnsweredQuizzes}
        options={{ tabBarLabel: 'Concluidos' }}
      />
    </TopTab.Navigator>
  </Suspense>
);

export default TopTabNavigator;

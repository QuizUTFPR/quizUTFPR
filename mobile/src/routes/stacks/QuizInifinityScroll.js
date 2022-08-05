import React, { lazy, Suspense } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Loading from '@components/Loading';

// Screens

const InfinityScrollHomeQuizzes = lazy(() =>
  import('@screens/HomeScreens/InfinityScroll/Quizzes')
);

const InfinityScrollFavoriteQuizzes = lazy(() =>
  import('@screens/HomeScreens/InfinityScroll/FavoriteQuizzes')
);

const InfinityScrollInProgressQuizzes = lazy(() =>
  import('@screens/HomeScreens/InfinityScroll/InProgressQuizzes')
);

const InfinityScrollRecentQuizzes = lazy(() =>
  import('@screens/HomeScreens/InfinityScroll/RecentQuizzes')
);

const InfinityScrollAnsweredQuizzes = lazy(() =>
  import('@screens/HomeScreens/InfinityScroll/AnsweredQuizzes')
);

// STACK
const Stack = createStackNavigator();

const HomeQuizzesStack = () => (
  <Suspense fallback={<Loading />}>
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="InfinityScrollHomeQuizzes"
        component={InfinityScrollHomeQuizzes}
      />
      <Stack.Screen
        name="InfinityScrollFavoriteQuizzes"
        component={InfinityScrollFavoriteQuizzes}
      />
      <Stack.Screen
        name="InfinityScrollInProgressQuizzes"
        component={InfinityScrollInProgressQuizzes}
      />
      <Stack.Screen
        name="InfinityScrollRecentQuizzes"
        component={InfinityScrollRecentQuizzes}
      />
      <Stack.Screen
        name="InfinityScrollAnsweredQuizzes"
        component={InfinityScrollAnsweredQuizzes}
      />
    </Stack.Navigator>
  </Suspense>
);

export default HomeQuizzesStack;

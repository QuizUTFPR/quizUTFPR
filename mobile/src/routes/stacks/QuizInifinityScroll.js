import React, { lazy, Suspense } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Loading from '@components/Loading';

// Screens

const InfinityScrollHomeQuizzes = lazy(() =>
  import('@screens/HomeTopMenuScreen/InfinityScroll/Quizzes')
);

const InfinityScrollFavoriteQuizzes = lazy(() =>
  import('@screens/HomeTopMenuScreen/InfinityScroll/FavoriteQuizzes')
);

const InfinityScrollInProgressQuizzes = lazy(() =>
  import('@screens/HomeTopMenuScreen/InfinityScroll/InProgressQuizzes')
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
    </Stack.Navigator>
  </Suspense>
);

export default HomeQuizzesStack;

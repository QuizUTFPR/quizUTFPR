import React, { lazy, Suspense } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Loading from '@components/Loading';

// Screens

const InfinityScrollHomeQuizzes = lazy(() =>
  import('@screens/HomeTopMenuScreen/InfinityScroll/Quizzes')
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
    </Stack.Navigator>
  </Suspense>
);

export default HomeQuizzesStack;

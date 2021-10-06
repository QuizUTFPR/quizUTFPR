import React, { lazy, Suspense } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Loading from '@components/Loading';

// PAGES
const HomeQuizzes = lazy(() => import('@pages/HomeQuizzes'));
const Logout = lazy(() => import('@pages/Logout'));
// STACK
const Stack = createStackNavigator();

const HomeStack = () => (
  <Suspense fallback={<Loading />}>
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="HomeQuizzes"
        component={HomeQuizzes}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Logout"
        component={Logout}
      />
    </Stack.Navigator>
  </Suspense>
);

export default HomeStack;

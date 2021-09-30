import React, { lazy, Suspense } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Loading from '@components/Loading';
// import AnsweredQuizzes from '@pages/AnsweredQuizzes';

// PAGES
const Home = lazy(() => import('@pages/Home'));
const Logout = lazy(() => import('@pages/Logout'));
// STACK
const Stack = createStackNavigator();

const HomeStack = () => (
  <Suspense fallback={<Loading />}>
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="Home"
        component={Home}
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

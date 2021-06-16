import React, { lazy, Suspense } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Loading from '@components/Loading';

// PAGES
const Home = lazy(() => import('@pages/Home'));

// STACK
const Stack = createStackNavigator();

const HomeStack = () => (
  <Suspense fallback={<Loading />}>
    <Stack.Navigator initialRouteName="InitialScreen">
      <Stack.Screen
        options={{ headerShown: false }}
        name="Home"
        component={Home}
      />
    </Stack.Navigator>
  </Suspense>
);

export default HomeStack;

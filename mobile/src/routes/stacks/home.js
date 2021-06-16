import React, { lazy, Suspense } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Loading from '@components/Loading';
import StudentHeader from '@components/StudentHeader';

const Stack = createStackNavigator();

const Home = lazy(() => import('@pages/Home'));

// CRIAÇÃO DE UM CONTAINER CONTENDO A STACK DE NAVEGAÇÃO DO APP

const HomeStack = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Stack.Navigator initialRouteName="InitialScreen">
        <Stack.Screen
          options={{ headerLeft: null, headerTitle: () => <StudentHeader /> }}
          name="Home"
          component={Home}
        />
      </Stack.Navigator>
    </Suspense>
  );
};

export default HomeStack;

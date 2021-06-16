import React, { lazy, Suspense } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Loading from '@components/Loading';
import StudentHeader from '@components/StudentHeader';

const Stack = createStackNavigator();

// PAGES
const Home = lazy(() => import('@pages/Home'));

// CRIAÇÃO DE UM CONTAINER CONTENDO A STACK DE NAVEGAÇÃO DO APP

<<<<<<< HEAD
const HomeStack = () => (
  <Suspense fallback={<Loading />}>
    <Stack.Navigator initialRouteName="InitialScreen">
      <Stack.Screen
        options={{ headerTitle: () => <StudentHeader /> }}
        name="Home"
        component={Home}
      />
    </Stack.Navigator>
  </Suspense>
);
=======
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
>>>>>>> 85d865c8f9218992c07089877c859806c887db8a

export default HomeStack;

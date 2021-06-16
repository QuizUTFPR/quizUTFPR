import React, { lazy, Suspense } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Loading from '@components/Loading';
import StudentHeader from '@components/StudentHeader';
// DIMENSION TRANSFORMERS
import { heightPercentageToDp } from '@styles/dimensions';

const Stack = createStackNavigator();

// PAGES
const Home = lazy(() => import('@pages/Home'));

// CRIAÇÃO DE UM CONTAINER CONTENDO A STACK DE NAVEGAÇÃO DO APP

const HomeStack = () => (
  <Suspense fallback={<Loading />}>
    <Stack.Navigator initialRouteName="InitialScreen">
      <Stack.Screen
        options={{
          headerStyle: { height: heightPercentageToDp('20%') },
          headerLeft: null,
          headerTitle: () => <StudentHeader />,
        }}
        name="Home"
        component={Home}
      />
    </Stack.Navigator>
  </Suspense>
);

export default HomeStack;

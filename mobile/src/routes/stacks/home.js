import React, { lazy, Suspense } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Loading from '@components/Loading';
import StudentHeader from '@components/StudentHeader';

// DIMENSION TRANSFORMERS
import { heightPercentageToDp } from '@styles/dimensions';

// PAGES
const Home = lazy(() => import('@pages/Home'));

// STACK
const Stack = createStackNavigator();

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

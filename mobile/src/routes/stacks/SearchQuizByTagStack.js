import React, { lazy, Suspense } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Loading from '@components/Loading';

// COMPONENTS
import HeaderSearchTag from '@components/Headers/HeaderSearchTag';

// Screens
const SearchTag = lazy(() => import('@screens/SearchQuizByTag'));

const ResultSearchTag = lazy(() =>
  import('@screens/SearchQuizByTag/ResultSearchQuizByTag')
);

// STACK
const Stack = createStackNavigator();

const SearchQuizByTagStack = () => (
  <Suspense fallback={<Loading />}>
    <Stack.Navigator>
      <Stack.Screen
        options={{ header: () => <HeaderSearchTag /> }}
        name="SearchTag"
        component={SearchTag}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="ResultSearchTag"
        component={ResultSearchTag}
      />
    </Stack.Navigator>
  </Suspense>
);

export default SearchQuizByTagStack;

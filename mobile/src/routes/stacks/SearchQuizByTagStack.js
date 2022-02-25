import React, { lazy, Suspense } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Loading from '@components/Loading';

// COMPONENTS
import HeaderSearchQuizByTag from '@components/Headers/HeaderSearchQuizByTag';
import HeaderResultSearchQuizByTag from '@components/Headers/HeaderResultSearchQuizByTag';

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
        options={{ header: () => <HeaderSearchQuizByTag /> }}
        name="SearchTag"
        component={SearchTag}
      />
      <Stack.Screen
        options={{ header: () => <HeaderResultSearchQuizByTag /> }}
        name="ResultSearchTag"
        component={ResultSearchTag}
      />
    </Stack.Navigator>
  </Suspense>
);

export default SearchQuizByTagStack;

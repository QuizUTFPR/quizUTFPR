import React, { lazy, Suspense } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Loading from '@components/Loading';

// CONTEXT
import QuestionProvider from '@context/Question';

// PAGES
import CountDown from '@pages/CountDown';
import Question from '@pages/Question';
import Statistics from '@pages/Statistics';

const MenuDrawer = lazy(() => import('@components/MenuDrawer'));
const QuizDescription = lazy(() => import('@pages/QuizDescription'));

// STACK
const Stack = createStackNavigator();

const TokenStack = () => (
  <Suspense fallback={<Loading />}>
    <QuestionProvider>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="Home"
          component={MenuDrawer}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Descricao"
          component={QuizDescription}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="CountDown"
          component={CountDown}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Question"
          component={Question}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Statistics"
          component={Statistics}
        />
      </Stack.Navigator>
    </QuestionProvider>
  </Suspense>
);

export default TokenStack;

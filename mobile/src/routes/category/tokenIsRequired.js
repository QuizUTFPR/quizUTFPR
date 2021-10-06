import React, { lazy, Suspense } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Loading from '@components/Loading';

// CONTEXT
import QuestionProvider from '@context/Question';

// PAGES
import CountDown from '@pages/CountDown';
import Question from '@pages/Question';
import Statistics from '@pages/Statistics';

import Logout from '@pages/Logout';
// const Logout = lazy(() => import('@pages/Logout'));

const MenuDrawer = lazy(() => import('@components/MenuDrawer'));
const QuizDescription = lazy(() => import('@pages/QuizDescription'));
const Attempt = lazy(() => import('@pages/AttemptsOfQuiz'));

// STACK
const Stack = createStackNavigator();

const TokenStack = () => (
  <Suspense fallback={<Loading />}>
    <QuestionProvider>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="HomeMenuDrawer" component={MenuDrawer} />
        <Stack.Screen name="AttempsOfQuiz" component={Attempt} />
        <Stack.Screen name="Descricao" component={QuizDescription} />
        <Stack.Screen name="CountDown" component={CountDown} />
        <Stack.Screen name="Question" component={Question} />
        <Stack.Screen name="Statistics" component={Statistics} />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Logout"
          component={Logout}
        />
      </Stack.Navigator>
    </QuestionProvider>
  </Suspense>
);

export default TokenStack;

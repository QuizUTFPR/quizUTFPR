import React, { lazy, Suspense } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Loading from '@components/Loading';

// CONTEXT
import QuestionProvider from '@context/Question';

// Screens
import CountDown from '@screens/CountDown';
import Question from '@screens/Question';
import Statistics from '@screens/Statistics';

import Logout from '@screens/Logout';
// const Logout = lazy(() => import('@screens/Logout'));

const MenuDrawer = lazy(() => import('@components/MenuDrawer'));
const QuizDescription = lazy(() => import('@screens/QuizDescription'));
const Attempt = lazy(() => import('@screens/AttemptsOfQuiz'));

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

import React, { lazy, Suspense } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Loading from '@components/Loading';

// CONTEXT
import QuestionProvider from '@context/Question';

// PAGES
import CountDown from '@pages/CountDown';
import Question from '@pages/Question';

const InitialScreen = lazy(() => import('@pages/InitialScreen'));
const Login = lazy(() => import('@pages/Login'));
const Register = lazy(() => import('@pages/Register'));

const Stack = createStackNavigator();

// CRIAÇÃO DE UM CONTAINER CONTENDO A STACK DE NAVEGAÇÃO DO APP

function Routes() {
  return (
    <Suspense fallback={<Loading />}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="InitialScreen"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="InitialScreen" component={InitialScreen} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="CountDown" component={CountDown} />
          <Stack.Screen name="Question">
            {(props) => (
              <QuestionProvider>
                <Question {...props} />
              </QuestionProvider>
            )}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </Suspense>
  );
}

export default Routes;

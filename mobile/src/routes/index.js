import React, { lazy, Suspense } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Loading from '@components/Loading';
// import StudentHeader from '@components/StudentHeader';

// CONTEXT
import QuestionProvider from '@context/Question';

// PAGES
import CountDown from '@pages/CountDown';
import Question from '@pages/Question';

// THEME
import { navigationTheme } from '../styles/theme';

const InitialScreen = lazy(() => import('@pages/InitialScreen2'));
const Login = lazy(() => import('@pages/Login'));
const Register = lazy(() => import('@pages/Register'));
const MenuDrawer = lazy(() => import('@components/MenuDrawer'));
const TabNavigator = lazy(() => import('./TabNavigator'));

const Stack = createStackNavigator();

// CRIAÇÃO DE UM CONTAINER CONTENDO A STACK DE NAVEGAÇÃO DO APP

function Routes() {
  return (
    <Suspense fallback={<Loading />}>
      <NavigationContainer theme={navigationTheme}>
        <Stack.Navigator initialRouteName="InitialScreen">
          <Stack.Screen
            options={{ headerShown: false }}
            name="InitialScreen"
            component={InitialScreen}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Login"
            component={Login}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Register"
            component={Register}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="CountDown"
            component={CountDown}
          />
          <Stack.Screen options={{ headerShown: false }} name="Question">
            {(props) => (
              <QuestionProvider>
                <Question {...props} />
              </QuestionProvider>
            )}
          </Stack.Screen>
          <Stack.Screen
            options={{ headerShown: false }}
            name="Home"
            component={MenuDrawer}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Suspense>
  );
}

export default Routes;

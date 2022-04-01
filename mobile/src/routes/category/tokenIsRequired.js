import React, { lazy, Suspense, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Loading from '@components/Loading';
import { useNavigation } from '@react-navigation/native';

// CONTEXT
import QuestionProvider from '@context/Question';
import ClassContextProvider from '@context/Class';
import SearchQuizByTagProvider from '@context/SearchQuizByTag';

// HOOKS
import useStudentAuth from '@hook/useStudentAuth';

// Screens
import CountDown from '@screens/CountDown';
import Question from '@screens/Question';
import Statistics from '@screens/Statistics';
import Logout from '@screens/Logout';
import ChooseNicknameAndAvatar from '@screens/ChooseNicknameAndAvatar';
import HeaderInfoClassPage from '../../components/Headers/HeaderInfoClassPage';

// Stack
const InfinityScrollStack = lazy(() => import('../stacks/QuizInifinityScroll'));
const MenuDrawer = lazy(() => import('@components/MenuDrawer'));
const QuizDescription = lazy(() => import('@screens/QuizDescription'));
const Attempt = lazy(() => import('@screens/AttemptsOfQuiz'));

// TOP TAB STACK
const TopTabClassInfo = lazy(() => import('../topTab/ClassInfoTopTab'));

// STACK
const Stack = createStackNavigator();

const TokenRequiredStack = () => {
  const { studentInfo } = useStudentAuth();
  const navigation = useNavigation();

  useEffect(() => {
    if (studentInfo.isFirstLogin) {
      navigation.navigate('ChooseNicknameAndAvatar');
    } else {
      navigation.navigate('HomeMenuDrawer');
    }
  }, [studentInfo]);

  return (
    <Suspense fallback={<Loading />}>
      <QuestionProvider>
        <ClassContextProvider>
          <SearchQuizByTagProvider>
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
                presentation: 'transparentModal',
              }}
            >
              <Stack.Screen name="HomeMenuDrawer" component={MenuDrawer} />
              <Stack.Screen name="AttempsOfQuiz" component={Attempt} />
              <Stack.Screen name="Descricao" component={QuizDescription} />
              <Stack.Screen name="CountDown" component={CountDown} />
              <Stack.Screen name="Question" component={Question} />
              <Stack.Screen name="Statistics" component={Statistics} />
              <Stack.Screen
                name="ChooseNicknameAndAvatar"
                component={ChooseNicknameAndAvatar}
              />
              <Stack.Screen
                options={{ headerShown: false }}
                name="Logout"
                component={Logout}
              />
              <Stack.Screen
                name="InfinityScrollQuizzesStack"
                component={InfinityScrollStack}
              />
              <Stack.Screen
                options={{
                  headerShown: true,
                  header: (props) => <HeaderInfoClassPage {...props} />,
                }}
                name="ClassStack"
                component={TopTabClassInfo}
              />
            </Stack.Navigator>
          </SearchQuizByTagProvider>
        </ClassContextProvider>
      </QuestionProvider>
    </Suspense>
  );
};

export default TokenRequiredStack;

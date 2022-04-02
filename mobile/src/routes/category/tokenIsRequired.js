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

// Components
import MenuDrawer from '@components/MenuDrawer';

// Stack
import CountDown from '@screens/CountDown';
import Question from '@screens/Question';
import Statistics from '@screens/Statistics';
import Logout from '@screens/Logout';
import ChooseNicknameAndAvatar from '@screens/ChooseNicknameAndAvatar';
import QuizRanking from '@screens/QuizRanking';

// Components
import HeaderInfoClassPage from '@components/Headers/HeaderInfoClassPage';
import HeaderQuizRanking from '@components/Headers/HeaderQuizRanking';

// Stack
import InfinityScrollStack from '../stacks/QuizInifinityScroll';
import TopTabClassInfo from '../topTab/ClassInfoTopTab';

// Screens
const Attempt = lazy(() => import('@screens/AttemptsOfQuiz'));
const QuizDescription = lazy(() => import('@screens/QuizDescription'));

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
      <ClassContextProvider>
        <QuestionProvider>
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
              <Stack.Screen
                options={{
                  headerShown: true,
                  header: (props) => <HeaderQuizRanking {...props} />,
                }}
                name="QuizRanking"
                component={QuizRanking}
              />
            </Stack.Navigator>
          </SearchQuizByTagProvider>
        </QuestionProvider>
      </ClassContextProvider>
    </Suspense>
  );
};

export default TokenRequiredStack;

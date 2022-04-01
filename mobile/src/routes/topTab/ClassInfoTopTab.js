import React, { lazy, Suspense } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Loading from '@components/Loading';
import { useRoute } from '@react-navigation/native';

// THEME
import theme from '@theme';

// Screens
const InfoOfClass = lazy(() => import('@screens/Class/Info'));
const QuizzesOfClass = lazy(() => import('@screens/Class/Quizzes'));
const MessagesOfClass = lazy(() => import('@screens/Class/Messages'));
const Ranking = lazy(() => import('@screens/Class/Ranking'));

// STACK
const TopTab = createMaterialTopTabNavigator();

const SearchQuizByTagTopTab = () => {
  const route = useRoute();
  const { subscribed } = route.params.params;

  return (
    <Suspense fallback={<Loading />}>
      <TopTab.Navigator
        style={{ backgroundColor: 'white' }}
        screenOptions={{
          tabBarScrollEnabled: subscribed,
          tabBarStyle: {
            borderBottomEndRadius: 30,
            borderBottomRightRadius: 30,
            borderBottomLeftRadius: 30,
            borderBottomStartRadius: 30,
          },
          tabBarActiveTintColor: theme.color.purple,
          tabBarInactiveTintColor: theme.color.grey,
          tabBarIndicatorStyle: {
            backgroundColor: 'transparent',
          },
          tabBarItemStyle: subscribed
            ? {
                width: 170,
                height: 60,
              }
            : {
                height: 60,
              },
          tabBarLabelStyle: {
            fontFamily: 'PoppinsBold',
            fontSize: theme.fontSize.normal,
            overflow: 'hidden',
          },
        }}
      >
        <TopTab.Screen
          name="InfoOfClass"
          component={InfoOfClass}
          options={{
            tabBarLabel: 'Info',
          }}
        />
        {subscribed && (
          <>
            <TopTab.Screen
              name="QuizzesOfClass"
              component={QuizzesOfClass}
              options={{
                tabBarLabel: 'Quizzes',
              }}
            />
            <TopTab.Screen
              name="RankingOfClass"
              component={Ranking}
              options={{
                tabBarLabel: 'Ranking',
              }}
            />
            <TopTab.Screen
              name="MessagesOfClass"
              component={MessagesOfClass}
              options={{
                tabBarLabel: 'Mensagens',
              }}
            />
          </>
        )}
      </TopTab.Navigator>
    </Suspense>
  );
};

export default SearchQuizByTagTopTab;

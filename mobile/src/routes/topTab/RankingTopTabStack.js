import React, { lazy, Suspense } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Loading from '@components/Loading';
import theme from '@theme';

// Components

// SCREEN
const RankingGlobal = lazy(() => import('@screens/RankingGlobal'));

// STACKS
const TopTab = createMaterialTopTabNavigator();

const RankingGlobalTopTab = () => (
  <Suspense fallback={<Loading />}>
    <TopTab.Navigator
      screenOptions={{
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
        // tabBarScrollEnabled: true,
        tabBarItemStyle: {
          // width: 170,
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
        name="RankingGlobal"
        component={RankingGlobal}
        options={{
          tabBarLabel: 'Geral',
          headerShown: false,
        }}
      />
    </TopTab.Navigator>
  </Suspense>
);

export default RankingGlobalTopTab;

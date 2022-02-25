import React, { lazy, Suspense } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Loading from '@components/Loading';

// TEMA
import theme from '@theme';

// SCREEN
const AllClassList = lazy(() => import('@screens/Class/AllClassList'));
const MyClassesList = lazy(() => import('@screens/Class/MyClassesList'));

// STACKS
const TopTab = createMaterialTopTabNavigator();

const ClassListTopTabNavigator = () => (
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
          fontSize: theme.fontSize,
          overflow: 'hidden',
        },
      }}
    >
      <TopTab.Screen
        name="AllClassListTopTab"
        component={AllClassList}
        options={{
          tabBarLabel: 'Todas as Turmas',
          headerShown: false,
        }}
      />
      <TopTab.Screen
        name="MyClassesListTopTab"
        component={MyClassesList}
        options={{ tabBarLabel: 'Minhas Turmas' }}
      />
    </TopTab.Navigator>
  </Suspense>
);

export default ClassListTopTabNavigator;

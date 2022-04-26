import React, { lazy, Suspense, useState } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Loading from '@components/Loading';
import theme from '@theme';

// Components
import FabButton from '@components/FabButton';
import DialogFindClassByPin from '@screens/Class/FindClassByPin';

// SCREEN
const AllClassList = lazy(() => import('@screens/Class/AllClassList'));
const MyClassesList = lazy(() => import('@screens/Class/MyClassesList'));

// STACKS
const TopTab = createMaterialTopTabNavigator();

const ClassListTopTabNavigator = () => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <Suspense fallback={<Loading />}>
      <FabButton onPress={() => setOpenModal(true)} />
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
          name="MyClassesListTopTab"
          component={MyClassesList}
          options={{ tabBarLabel: 'Minhas Turmas' }}
        />
        <TopTab.Screen
          name="AllClassListTopTab"
          component={AllClassList}
          options={{
            tabBarLabel: 'Turmas Disponíveis',
            headerShown: false,
          }}
        />
      </TopTab.Navigator>

      <DialogFindClassByPin
        visible={openModal}
        hideDialog={() => setOpenModal(false)}
      />
    </Suspense>
  );
};

export default ClassListTopTabNavigator;

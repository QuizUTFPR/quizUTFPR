import React, { lazy, Suspense } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Loading from '@components/Loading';
import { useTheme } from '@react-navigation/native';

// ICONS
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';

// STYLES
import { DrawerLabelStyled } from './styles';

// COMPONENT
import MyDrawer from './myDrawer';

const Drawer = createDrawerNavigator();

// PAGES
const TabNavigator = lazy(() => import('@routes/TabNavigator'));
const AnsweredQuizzes = lazy(() => import('@pages/AnsweredQuizzes'));
// const HomeStack = lazy(() => import('@routes/stacks/home'));

const DrawerComponent = () => {
  const { colors } = useTheme();

  return (
    <Suspense fallback={<Loading />}>
      <Drawer.Navigator
        screenOptions={{
          activeTintColor: colors.purple,
          itemStyle: {},
          labelStyle: {
            fontFamily: 'PoppinsSemiBold',
          },
          headerShown: false,
        }}
        drawerContent={(props) => <MyDrawer colors={colors} {...props} />}
      >
        <Drawer.Screen
          name="HomeDrawer"
          options={{
            drawerLabel: ({ color }) => (
              <DrawerLabelStyled color={color}>Inicio</DrawerLabelStyled>
            ),
            drawerIcon: ({ focused, size }) => (
              <Ionicons
                name="md-home"
                size={size}
                color={focused ? colors.purple : 'grey'}
              />
            ),
          }}
          component={TabNavigator}
        />
        <Drawer.Screen
          name="AnsweredQuizzes"
          options={{
            drawerLabel: ({ color }) => (
              <DrawerLabelStyled color={color}>
                Quizzes Respondidos
              </DrawerLabelStyled>
            ),
            drawerIcon: ({ focused, size }) => (
              <FontAwesome5
                name="book"
                size={size}
                color={focused ? colors.purple : 'grey'}
              />
            ),
          }}
          component={AnsweredQuizzes}
        />
      </Drawer.Navigator>
    </Suspense>
  );
};

export default DrawerComponent;

/* eslint-disable react-perf/jsx-no-new-object-as-prop */
import React, { Suspense } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Loading from '@components/Loading';
import { useTheme } from '@react-navigation/native';

// ICONS
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

// STYLES
import Feedback from '@screens/Feedback';
import BottomTabNavigator from '@routes/bottomTab/BottomTabNavigator';
import { DrawerLabelStyled } from './styles';

// COMPONENT
import MyDrawer from './myDrawer';

// SCREENS
const Drawer = createDrawerNavigator();

const DrawerComponent = () => {
  const { colors } = useTheme();

  return (
    <Suspense fallback={<Loading />}>
      <Drawer.Navigator
        screenOptions={{
          activeTintColor: colors.activeColorDrawer,
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
                color={focused ? colors.activeColorDrawer : 'grey'}
              />
            ),
          }}
          component={BottomTabNavigator}
        />
        <Drawer.Screen
          name="Feedback"
          options={{
            drawerLabel: ({ color }) => (
              <DrawerLabelStyled color={color}>Feedback</DrawerLabelStyled>
            ),
            drawerIcon: ({ focused, size }) => (
              <MaterialIcons
                name="feedback"
                size={size}
                color={focused ? colors.activeColorDrawer : 'grey'}
              />
            ),
          }}
          component={Feedback}
        />
      </Drawer.Navigator>
    </Suspense>
  );
};

export default DrawerComponent;

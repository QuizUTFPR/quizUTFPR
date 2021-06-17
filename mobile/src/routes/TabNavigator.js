import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from '@react-navigation/native';

// COMPONENTS
import TabBar from '@components/TabBar';

// DIMENSIONS
import { heightPercentageToDp } from '@styles/dimensions';

// STACKS
import HomeStack from './stacks/home';

// TAB CREATION
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const { colors: ColorNavigation } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => TabBar(route, color),
      })}
      tabBarOptions={{
        activeTintColor: ColorNavigation.purple,
        inactiveTintColor: 'red',
        iconStyle: {
          marginBottom: -15,
        },
        labelStyle: {
          fontFamily: 'PoppinsBold',
          marginBottom: 5,
        },
        style: {
          backgroundColor: ColorNavigation.white,
          borderTopRightRadius: 40,
          borderTopColor: 'transparent',
          borderTopLeftRadius: 40,
          height: heightPercentageToDp('10%'),
          elevation: 21,
        },
      }}
    >
      <Tab.Screen name="Home" component={HomeStack} />
    </Tab.Navigator>
  );
};

export default TabNavigator;

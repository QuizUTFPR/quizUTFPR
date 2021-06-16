import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// COMPONENTS
import TabBar from '@components/TabBar';

// STACKS
import HomeStack from './stacks/home';

const Tab = createBottomTabNavigator();

<<<<<<< HEAD
const TabNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen name="Home" component={HomeStack} />
  </Tab.Navigator>
);
=======
const TabNavigator = () => {
  return (
    <Tab.Navigator tabBar={(props) => <TabBar {...props} />}>
      <Tab.Screen name="Home" component={HomeStack} />
    </Tab.Navigator>
  );
};
>>>>>>> 85d865c8f9218992c07089877c859806c887db8a

export default TabNavigator;

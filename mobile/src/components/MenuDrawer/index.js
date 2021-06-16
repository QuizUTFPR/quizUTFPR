import React, { lazy, Suspense } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Loading from '@components/Loading';

const Drawer = createDrawerNavigator();

// PAGES
const TabNavigator = lazy(() => import('@routes/TabNavigator'));

const DrawerComponent = () => (
  <Suspense fallback={<Loading />}>
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen
        name="Home"
        component={TabNavigator}
        options={{ drawerLabel: 'Home' }}
      />
    </Drawer.Navigator>
  </Suspense>
);

export default DrawerComponent;

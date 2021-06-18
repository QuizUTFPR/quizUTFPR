import React from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';

// STYLES
import { WrapperMyDrawer, Avatar, StudentName, Divider } from './styles';

const CustomSidebarMenu = (props) => (
  <WrapperMyDrawer style={{ flex: 1 }}>
    <Avatar
      source={{
        uri: 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/react_logo.png',
      }}
    />
    <StudentName fill="purple">Nome aluno</StudentName>

    <Divider fill="purple" />
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  </WrapperMyDrawer>
);

export default CustomSidebarMenu;

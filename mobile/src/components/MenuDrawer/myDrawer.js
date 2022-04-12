import React from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

// ICONS
import { MaterialCommunityIcons } from '@expo/vector-icons';

// HOOKS
import useStudentAuth from '@hook/useStudentAuth';

// STYLES
import {
  WrapperMyDrawer,
  StudentName,
  Divider,
  DrawerLabelStyled,
  Avatar,
} from './styles';

const CustomSidebarMenu = ({ colors, ...props }) => {
  const { studentInfo, logout } = useStudentAuth();
  console.log('studentInfo', studentInfo);
  return (
    <WrapperMyDrawer style={{ flex: 1 }}>
      <Avatar
        source={{
          uri: studentInfo.student.image,
        }}
      />
      <StudentName fill="purple">
        {studentInfo.student && studentInfo.student.name}
      </StudentName>

      <Divider fill="purple" />
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem
          icon={({ focused, size }) => (
            <MaterialCommunityIcons
              name="logout-variant"
              size={size}
              color={focused ? colors.purple : 'grey'}
            />
          )}
          label={({ color }) => (
            <DrawerLabelStyled color={color}>Sair</DrawerLabelStyled>
          )}
          onPress={() => logout()}
        />
      </DrawerContentScrollView>
    </WrapperMyDrawer>
  );
};

export default CustomSidebarMenu;

/* eslint-disable react-perf/jsx-no-new-object-as-prop */
import React from 'react';
import { useNavigation } from '@react-navigation/native';

import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

// ICONS
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

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
  const navigation = useNavigation();
  const { studentInfo, logout } = useStudentAuth();

  return (
    <WrapperMyDrawer style={{ flex: 1 }}>
      <Avatar
        source={{
          uri: studentInfo?.student?.isLocalImage
            ? studentInfo?.student?.idImage
            : studentInfo?.student?.urlImage,
        }}
      />
      <StudentName fill="purple">
        {studentInfo.student ? studentInfo.student.name : null}
      </StudentName>

      <Divider fill="purple" />
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem
          icon={({ focused, size }) => (
            <MaterialIcons
              name="verified"
              size={size}
              color={focused ? colors.activeColorDrawer : 'grey'}
            />
          )}
          label={({ color }) => (
            <DrawerLabelStyled color={color}>
              Quizzes Concluídos
            </DrawerLabelStyled>
          )}
          onPress={() =>
            navigation.navigate('InfinityScrollQuizzesStack', {
              screen: 'InfinityScrollAnsweredQuizzes',
            })
          }
        />
        <DrawerItem
          icon={({ focused, size }) => (
            <MaterialCommunityIcons
              name="logout-variant"
              size={size}
              color={focused ? colors.activeColorDrawer : 'grey'}
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

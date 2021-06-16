import React from 'react';
import { View, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { HeaderWrapper, MenuButton } from './styles';

const StudentHeader = () => {
  const navigation = useNavigation();
  return (
    <HeaderWrapper>
      <MenuButton onPress={() => navigation.openDrawer()}>
        <MaterialIcons name="menu" size={32} color="black" />
      </MenuButton>

      <View>
        <Text>Header Customizédi</Text>
      </View>
    </HeaderWrapper>
  );
};

export default StudentHeader;

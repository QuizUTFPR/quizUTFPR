import React from 'react';
import { Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { HeaderWrapper, IconButton, MiddleContent } from './styles';

const StudentHeader = () => {
  const navigation = useNavigation();
  return (
    <HeaderWrapper>
      <IconButton onPress={() => navigation.openDrawer()}>
        <MaterialIcons name="menu" size={32} color="black" />
      </IconButton>

      <MiddleContent>
        <Text>
          Header
          CustomizédiCustomizédiCustomizédiCustomizédiCustomizédiCustomizédiCustomizédiCustomizédiCustomizédiCustomizédiCustomizédi
          CustomizédiCustomizédiCustomizédiCustomizédiCustomizédiCustomizédi
        </Text>
      </MiddleContent>

      <IconButton onPress={() => console.log('settings')}>
        <MaterialIcons name="settings" size={32} color="black" />
      </IconButton>
    </HeaderWrapper>
  );
};

export default StudentHeader;

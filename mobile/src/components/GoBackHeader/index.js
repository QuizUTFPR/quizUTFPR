import React from 'react';
import { useNavigation } from '@react-navigation/native';

// ICONS
import { Ionicons } from '@expo/vector-icons';

// STYLES
import { StyledIconButton, GoBackButtonWrapper } from './style';

const GoBackHeader = () => {
  const navigation = useNavigation();

  return (
    <GoBackButtonWrapper>
      <StyledIconButton onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={32} color="white" />
      </StyledIconButton>
    </GoBackButtonWrapper>
  );
};
export default GoBackHeader;

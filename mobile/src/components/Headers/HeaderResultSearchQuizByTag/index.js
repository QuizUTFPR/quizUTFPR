import React from 'react';
import { useNavigation } from '@react-navigation/native';

// Icons
import { Ionicons } from '@expo/vector-icons';

// Style
import { HeaderWrapper, Background, StyledIconButton } from './style';

const HeaderResultSearchQuizByTag = () => {
  const navigation = useNavigation();

  return (
    <Background>
      <HeaderWrapper>
        <StyledIconButton onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={32} color="white" />
        </StyledIconButton>
      </HeaderWrapper>
    </Background>
  );
};

export default HeaderResultSearchQuizByTag;

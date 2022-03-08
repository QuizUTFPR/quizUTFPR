import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

// STYLES
import {
  ClassInfoHeader,
  StyledImageBackground,
  GoBackButtonWrapper,
  StyledIconButton,
  ButtonWrapper,
  ButtonStyled,
  SubscribeButton,
  StyledText,
} from './style';

const HeaderInfoClassPage = () => {
  const navigation = useNavigation();

  return (
    <ClassInfoHeader>
      <StyledImageBackground source={null}>
        <GoBackButtonWrapper>
          <StyledIconButton onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={32} color="white" />
          </StyledIconButton>
        </GoBackButtonWrapper>
        <ButtonWrapper>
          <ButtonStyled onPress={console.log('clicou Entrar')}>
            <SubscribeButton>
              <StyledText>ENTRAR</StyledText>
            </SubscribeButton>
          </ButtonStyled>
        </ButtonWrapper>
      </StyledImageBackground>
    </ClassInfoHeader>
  );
};

export default HeaderInfoClassPage;

import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import api from '@api';

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
  const route = useRoute();
  const { subscribed, id } = route.params.params;

  const registerStudentInClass = async () => {
    try {
      await api.post('/class/attachStudent', {
        idClass: id,
      });

      navigation.setParams({
        params: {
          ...route.params.params,
          subscribed: true,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ClassInfoHeader>
      <StyledImageBackground source={null}>
        <GoBackButtonWrapper>
          <StyledIconButton onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={32} color="white" />
          </StyledIconButton>
        </GoBackButtonWrapper>
        {!subscribed && (
          <ButtonWrapper>
            <ButtonStyled onPress={registerStudentInClass}>
              <SubscribeButton>
                <StyledText>ENTRAR</StyledText>
              </SubscribeButton>
            </ButtonStyled>
          </ButtonWrapper>
        )}
      </StyledImageBackground>
    </ClassInfoHeader>
  );
};

export default HeaderInfoClassPage;

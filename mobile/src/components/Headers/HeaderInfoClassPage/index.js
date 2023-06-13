import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import api from '@api';

// HOOKS
import useClass from '@hook/useClass';

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
  const { classData, handleSetClassData } = useClass();
  const { subscribed, id } = classData;

  const registerStudentInClass = async () => {
    try {
      await api.post('/studentClass/attachStudent', {
        idClass: id,
      });

      handleSetClassData((prevState) => ({
        ...prevState,
        subscribed: true,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ClassInfoHeader>
      <StyledImageBackground
        source={
          classData?.image
            ? {
                uri: classData.image,
              }
            : null
        }
      >
        <GoBackButtonWrapper>
          <StyledIconButton onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={32} color="white" />
          </StyledIconButton>
        </GoBackButtonWrapper>
        {!subscribed ? (
          <ButtonWrapper>
            <ButtonStyled onPress={registerStudentInClass}>
              <SubscribeButton>
                <StyledText>ENTRAR</StyledText>
              </SubscribeButton>
            </ButtonStyled>
          </ButtonWrapper>
        ) : null}
      </StyledImageBackground>
    </ClassInfoHeader>
  );
};

export default HeaderInfoClassPage;

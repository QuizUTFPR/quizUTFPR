import React from 'react';
import { useNavigation } from '@react-navigation/native';

// Components
import Input from '@components/Input';
import ButtonGradient from '@components/ButtonGradient';
import { Ionicons } from '@expo/vector-icons';

// Styles
import {
  InputWrapper,
  WrapperHeader,
  StyledContainer,
  Title,
  Description,
  GoBackButtonWrapper,
  StyledIconButton,
  TopWrapper,
  MiddleWrapper,
  BottomWrapper,
} from './style';

const Feedback = () => {
  const navigation = useNavigation();

  return (
    <StyledContainer>
      <WrapperHeader>
        <GoBackButtonWrapper>
          <StyledIconButton onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={32} color="white" />
          </StyledIconButton>
        </GoBackButtonWrapper>
      </WrapperHeader>

      <TopWrapper>
        <Title>Feedback</Title>
        <Description>
          Digite na caixa abaixo sugestões de melhorias e problemas encontrados
          durante a utilização do aplicativo.
        </Description>
      </TopWrapper>

      <MiddleWrapper>
        <InputWrapper>
          <Input
            fill="black"
            label="Mensagem"
            placeholder="Escreva um bug encontrado ou um sugestão de melhoria..."
            multiline
            height="100%"
            textAlignVertical="top"
            paddingWrapper="10px 0"
            // blurOnSubmit={false}
          />
        </InputWrapper>
      </MiddleWrapper>

      <BottomWrapper>
        <InputWrapper>
          <ButtonGradient variant="primary">ENVIAR</ButtonGradient>
        </InputWrapper>
      </BottomWrapper>
    </StyledContainer>
  );
};

export default Feedback;

import React from 'react';
import { KeyboardAvoidingView } from 'react-native';

// COMPONENTS
import Container from '@components/Container';
import Input from '@components/Input';
import Button from '@components/Button';
import Header from '@components/Header';
import DismissKeyboard from '@components/DismissKeyboard';

// STYLES
import {
  BackgroundImage,
  InputWrapper,
  WrapperButton,
  StyledTextButton,
} from './styles';

const Register = ({ navigation }) => (
  <Container>
    <BackgroundImage fill="#333D54" />
    <Header
      buttonColor="white"
      iconButton="chevron-left"
      size={20}
      onPressButton={() => navigation.goBack()}
      titleContent="Cadastro"
      textContent="Por favor, informe seus dados"
    />

    <KeyboardAvoidingView behavior="position" enabled>
      <DismissKeyboard>
        <InputWrapper>
          <Input label="Nome de Usuário" />
          <Input label="E-mail" />
          <Input label="Senha" secureTextEntry />
          <Input label="Confirmar Senha" secureTextEntry />
        </InputWrapper>
      </DismissKeyboard>
    </KeyboardAvoidingView>

    <WrapperButton>
      <Button variant="primary" onPress={() => {}}>
        Cadastrar
      </Button>
    </WrapperButton>

    <StyledTextButton
      variant="secondary"
      onPress={() => navigation.navigate('Login')}
    >
      Já possui cadastro? Realize o Login
    </StyledTextButton>
  </Container>
);

export default Register;

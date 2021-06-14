import React from 'react';
import { KeyboardAvoidingView } from 'react-native';

// COMPONENTS
import Container from '@components/Container';
import Header from '@components/Header';
import Input from '@components/Input';
import DismissKeyboard from '@components/DismissKeyboard';
import Button from '@components/Button';

// STYLES
import {
  BackgroundImage,
  InputWrapper,
  WrapperButton,
  StyledTextButton,
  ForgotPasswordButton,
} from './styles';

const Login = ({ navigation }) => (
  <Container>
    <BackgroundImage fill="#333D54" />
    <Header
      buttonColor="white"
      iconButton="chevron-left"
      size={20}
      onPressButton={() => navigation.goBack()}
      titleContent="Login"
      textContent="Por favor, informe seus dados"
    />

    <KeyboardAvoidingView behavior="position" enabled>
      <DismissKeyboard>
        <InputWrapper>
          <Input label="Nome de Usuário" />

          <Input label="Senha" secureTextEntry />
          <ForgotPasswordButton onPress={() => {}}>
            Esqueceu sua senha?
          </ForgotPasswordButton>
        </InputWrapper>
      </DismissKeyboard>
    </KeyboardAvoidingView>

    <WrapperButton>
      <Button onPress={() => console.log('pressed')} icon="login-variant">
        Entrar
      </Button>
    </WrapperButton>

    <StyledTextButton onPress={() => navigation.navigate('Register')}>
      Não possui uma conta? Cadastre-se
    </StyledTextButton>
  </Container>
);
export default Login;

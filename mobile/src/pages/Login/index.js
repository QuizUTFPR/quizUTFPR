import React from 'react';
import { KeyboardAvoidingView } from 'react-native';
import { useTheme } from 'react-native-paper';

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

const Login = ({ navigation }) => {
  const { label } = useTheme();

  return (
    <Container>
      <BackgroundImage fill="#333D54" />
      <Header
        buttonColor="white"
        iconButton="chevron-left"
        size={20}
        onPressButton={() => navigation.goBack()}
        fontSize={label.fontSize}
        titleContent="Login"
        textContent="Por favor, informe seus dados"
      />

      <KeyboardAvoidingView behavior="position" enabled>
        <DismissKeyboard>
          <InputWrapper>
            <Input labelText="Nome de Usuário" mode="outlined" icon="account" />

            <Input
              secureTextEntry
              labelText="Senha"
              mode="outlined"
              icon="lock"
            />
            <ForgotPasswordButton
              mode="text"
              compact
              uppercase={false}
              onPress={() => {}}
            >
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

      <StyledTextButton
        mode="text"
        compact
        uppercase={false}
        onPress={() => navigation.navigate('Register')}
      >
        Não possui uma conta? Cadastra-se
      </StyledTextButton>
    </Container>
  );
};

export default Login;

import React from 'react';
import { KeyboardAvoidingView } from 'react-native';

// ICONS
import { FontAwesome5 } from '@expo/vector-icons';

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
          <Input
            placeholder="Digite seu nome de usuário"
            icon={<FontAwesome5 name="user-alt" size={24} color="black" />}
            label="Nome de Usuário"
          />

          <Input
            placeholder="Digite sua senha"
            icon={<FontAwesome5 name="lock" size={24} color="black" />}
            label="Senha"
            secureTextEntry
          />
          <ForgotPasswordButton
            backgroundColor="white"
            variant="secondary"
            onPress={() => {}}
          >
            Esqueceu sua senha?
          </ForgotPasswordButton>
        </InputWrapper>
      </DismissKeyboard>
    </KeyboardAvoidingView>

    <WrapperButton>
      <Button
        variant="primary"
        onPress={() => console.log('pressed')}
        icon="login-variant"
      >
        Entrar
      </Button>
    </WrapperButton>

    <StyledTextButton
      variant="secondary"
      onPress={() => navigation.navigate('Register')}
    >
      Não possui uma conta? Cadastre-se
    </StyledTextButton>
  </Container>
);
export default Login;

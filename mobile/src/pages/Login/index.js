import React from 'react';
import { KeyboardAvoidingView } from 'react-native';

// ICONS
import { FontAwesome5, Ionicons } from '@expo/vector-icons';

// COMPONENTS
import Container from '@components/Container';
import Header from '@components/Header';
import Input from '@components/Input';
import DismissKeyboard from '@components/DismissKeyboard';
import ButtonGradient from '@components/ButtonGradient';

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
    <BackgroundImage />
    <Header
      iconButton={<Ionicons name="chevron-back" size={32} color="white" />}
      onPressButton={() => navigation.goBack()}
      titleContent="Login"
      textContent="Por favor, informe seus dados"
    />

    <KeyboardAvoidingView behavior="position" enabled>
      <DismissKeyboard>
        <InputWrapper>
          <Input
            fill="black"
            placeholder="Digite seu nome de usuário"
            icon={<FontAwesome5 name="user-alt" size={24} color="#222222" />}
            label="Nome de Usuário"
          />

          <Input
            fill="black"
            placeholder="Digite sua senha"
            icon={<FontAwesome5 name="lock" size={24} color="#222222" />}
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
      <ButtonGradient
        variant="primary"
        onPress={() => console.log('pressed')}
        icon="login-variant"
      >
        Entrar
      </ButtonGradient>
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

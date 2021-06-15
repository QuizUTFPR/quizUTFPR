import React from 'react';
import { KeyboardAvoidingView } from 'react-native';

// COMPONENTS
import Container from '@components/Container';
import Input from '@components/Input';
import ButtonGradient from '@components/ButtonGradient';
import Header from '@components/Header';
import DismissKeyboard from '@components/DismissKeyboard';

// STYLES
import { FontAwesome5, Zocial, Ionicons } from '@expo/vector-icons';

import {
  BackgroundImage,
  InputWrapper,
  WrapperButton,
  StyledTextButton,
} from './styles';

// ICONS

const Register = ({ navigation }) => (
  <Container>
    <BackgroundImage />
    <Header
      iconButton={<Ionicons name="chevron-back" size={32} color="white" />}
      onPressButton={() => navigation.goBack()}
      titleContent="Cadastro"
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
            autoCompleteType="email"
            placeholder="Digite seu endereço eletrônico"
            keyboardType="email-address"
            icon={<Zocial name="email" size={24} color="black" />}
            label="E-mail"
          />
          <Input
            placeholder="Digite uma senha"
            icon={<FontAwesome5 name="lock" size={24} color="black" />}
            label="Senha"
            secureTextEntry
          />
          <Input
            placeholder="Confirme a senha digitada"
            icon={<FontAwesome5 name="lock" size={24} color="black" />}
            label="Confirmar Senha"
            secureTextEntry
          />
        </InputWrapper>
      </DismissKeyboard>
    </KeyboardAvoidingView>

    <WrapperButton>
      <ButtonGradient variant="primary" onPress={() => {}}>
        Cadastrar
      </ButtonGradient>
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

import React from 'react';
import { KeyboardAvoidingView } from 'react-native';
import { useTheme } from 'react-native-paper';

// COMPONENTS
import Container from '@components/Container';
import Input from '@components/Input';
import Button from '@components/Button';
import DismissKeyboard from '@components/DismissKeyboard';

// STYLES
import {
  BackgroundImage,
  StyledIconButton,
  StyledTitle,
  StyledText,
  InputWrapper,
  WrapperButton,
  StyledTextButton,
} from './styles';

const Register = ({ navigation }) => {
  const { label } = useTheme();

  return (
    <Container>
      <BackgroundImage fill="#333D54" />
      <StyledIconButton
        color="white"
        icon="chevron-left"
        size={20}
        onPress={() => navigation.goBack()}
      />

      <StyledTitle fontSize={label.fontSize}>Cadastro</StyledTitle>

      <StyledText fontSize={label.fontSize}>
        Por favor, informe seus dados
      </StyledText>

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
            <Input
              secureTextEntry
              labelText="Confirmar Senha"
              mode="outlined"
              icon="lock"
            />
          </InputWrapper>
        </DismissKeyboard>
      </KeyboardAvoidingView>

      <WrapperButton>
        <Button onPress={() => console.log('pressed')} icon="login-variant">
          Cadastrar
        </Button>
      </WrapperButton>

      <StyledTextButton
        mode="text"
        compact
        uppercase={false}
        onPress={() => navigation.navigate('Login')}
      >
        Já possui cadastro? Realize o Login
      </StyledTextButton>
    </Container>
  );
};

export default Register;

import React from 'react';
import { KeyboardAvoidingView } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';

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
  // ForgotPasswordButton,
} from './styles';

const Login = ({ navigation }) => {
  const loginValidationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Por favor, informe um e-mail válido')
      .required('Por favor, informe um e-mail'),
    password: Yup.string()
      .min(8, ({ min }) => `O mínimo são ${min} caracteres`)
      .required('A senha é obrigatória'),
  });
  return (
    <Container>
      <BackgroundImage />
      <Header
        iconButton={<Ionicons name="chevron-back" size={32} color="white" />}
        onPressButton={() => navigation.goBack()}
        titleContent="Login"
        textContent="Por favor, informe seus dados"
      />
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={loginValidationSchema}
        onSubmit={(values) => console.log(values)}
      >
        {({
          handleChange,
          handleBlur,
          // handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <>
            <KeyboardAvoidingView behavior="position" enabled>
              <DismissKeyboard>
                <InputWrapper>
                  <Input
                    error={errors.email && touched.email}
                    errorMessage={errors.email}
                    fill="black"
                    placeholder="Digite seu e-mail"
                    icon={
                      <FontAwesome5 name="user-alt" size={24} color="#222222" />
                    }
                    label="E-mail"
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                  />

                  <Input
                    error={errors.password && touched.password}
                    errorMessage={errors.password}
                    fill="black"
                    placeholder="Digite sua senha"
                    icon={
                      <FontAwesome5 name="lock" size={24} color="#222222" />
                    }
                    label="Senha"
                    secureTextEntry
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                  />
                  {/* <ForgotPasswordButton
                    backgroundColor="white"
                    variant="secondary"
                    onPress={() => {}}
                  >
                    Esqueceu sua senha?
                  </ForgotPasswordButton> */}
                </InputWrapper>
              </DismissKeyboard>
            </KeyboardAvoidingView>

            <WrapperButton>
              <ButtonGradient
                style={{ borderRadius: 50 }}
                // colors={['#fdb646', '#f99f4c']}
                variant="primary"
                // onPress={handleSubmit}
                onPress={() => navigation.navigate('Home')}
                icon="login-variant"
              >
                ENTRAR
              </ButtonGradient>
            </WrapperButton>
          </>
        )}
      </Formik>

      <StyledTextButton
        variant="secondary"
        onPress={() => navigation.navigate('Register')}
      >
        Não possui uma conta? Cadastre-se
      </StyledTextButton>
    </Container>
  );
};
export default Login;

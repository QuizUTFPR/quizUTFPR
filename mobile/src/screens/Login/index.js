import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';

// THEME

// ICONS
import { FontAwesome5, Ionicons } from '@expo/vector-icons';

// COMPONENTS
import Container from '@components/Container';
import HeaderLoginRegister from '@components/HeaderLoginRegister';
import Input from '@components/Input';
import DismissKeyboard from '@components/DismissKeyboard';
import ButtonGradient from '@components/ButtonGradient';
import Toast from '@components/Toast';

// HOOKS
import useStudentAuth from '@hook/useStudentAuth';
import theme from '../../styles/theme';

// STYLES
import {
  BackgroundImage,
  InputWrapper,
  WrapperButton,
  // StyledTextButton,
} from './styles';

const Login = ({ navigation }) => {
  const loginValidationSchema = Yup.object().shape({
    ra: Yup.string().required('Obrigatório'),
    password: Yup.string()
      .min(8, ({ min }) => `O mínimo são ${min} caracteres`)
      .required('Obrigatório'),
  });

  const { login } = useStudentAuth();
  const [loading, setLoading] = useState(false);

  const [showToast, setShowToast] = useState({
    open: false,
    message: '',
  });

  const handleCloseToast = () => {
    setShowToast({
      open: false,
      message: '',
    });
  };

  return (
    <>
      <Container>
        <Formik
          initialValues={{
            ra: '',
            password: '',
          }}
          validationSchema={loginValidationSchema}
          onSubmit={async (values) => {
            setLoading(true);
            const response = await login(values);
            if (response.status !== 200) {
              setShowToast({
                open: true,
                message: response.message,
              });
            }

            setLoading(false);
          }}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <>
              <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'position'}
              >
                <BackgroundImage />
                <DismissKeyboard>
                  <>
                    <HeaderLoginRegister
                      iconButton={
                        <Ionicons name="chevron-back" size={32} color="white" />
                      }
                      onPressButton={() => navigation.goBack()}
                      titleContent="Login"
                      textContent="Por favor, informe seus dados"
                    />
                    <InputWrapper>
                      <Input
                        error={errors.ra && touched.ra}
                        errorMessage={errors.ra}
                        fill="black"
                        placeholder="Digite seu RA"
                        icon={
                          <FontAwesome5
                            name="user-alt"
                            size={18}
                            color={theme.color.darkGrey}
                          />
                        }
                        label="RA"
                        onChangeText={handleChange('ra')}
                        onBlur={handleBlur('ra')}
                        value={values.ra}
                        keyboardType="email-address"
                        autoCapitalize="none"
                      />

                      <Input
                        error={errors.password && touched.password}
                        errorMessage={errors.password}
                        fill="black"
                        placeholder="Digite sua senha"
                        icon={
                          <FontAwesome5
                            name="lock"
                            size={18}
                            color={theme.color.darkGrey}
                          />
                        }
                        label="Senha"
                        secureTextEntry
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        value={values.password}
                        autoCapitalize="none"
                      />
                    </InputWrapper>
                  </>
                </DismissKeyboard>
              </KeyboardAvoidingView>

              <WrapperButton>
                <ButtonGradient
                  variant="primary"
                  onPress={handleSubmit}
                  icon="login-variant"
                  loading={loading}
                >
                  ENTRAR
                </ButtonGradient>
              </WrapperButton>
              {/* <StyledTextButton
                variant="secondary"
                onPress={() => navigation.navigate('Register')}
              >
                Não possui uma conta? Cadastre-se
              </StyledTextButton> */}
            </>
          )}
        </Formik>
      </Container>
      <Toast
        type="error"
        handleClose={handleCloseToast}
        open={showToast.open}
        timeToErase={2000}
      >
        {showToast.message}
      </Toast>
    </>
  );
};

export default Login;

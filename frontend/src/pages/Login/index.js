import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// GOOGLE AUTH
import * as AuthSession from 'expo-auth-session';

// COMPONENTS
import { Grid, InputAdornment, IconButton } from '@mui/material';
import ErrorMessage from '@components/Messages/error';

import {
  AccountCircle,
  Visibility,
  VisibilityOff,
  Lock,
} from '@mui/icons-material';

// HOOKS
import useAuth from '@hooks/Auth';

// ROTAS
import { HOME } from '@routes';

import {
  StyledContainer,
  DescriptionsGrid,
  Title,
  Subtitle,
  GridForm,
  StyledInput,
  StyledButton,
  LogoUTFPR,
} from './style';

const LoginPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();

  const [values, setValues] = useState({
    email: '',
    password: '',
    showPassword: false,
  });

  const [error, setError] = useState(false);

  const handleChange = (prop) => (event) => {
    setValues({
      ...values,
      [prop]: event.target.value,
    });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { response } = await login(values.email, values.password);

    if (response.status === 200) {
      navigate(HOME);
    } else {
      setError(response.data.response);
    }

    setLoading(false);
  };

  return (
    <StyledContainer>
      <Grid container justifyContent="center" alignItems="center">
        <Grid
          style={{ display: 'flex', justifyContent: 'center' }}
          item
          xs={12}
          sm={12}
          md={12}
          lg={6}
        >
          <LogoUTFPR />
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={6}>
          <DescriptionsGrid item xs={12}>
            <Title variant="h4" color="black">
              Login
            </Title>
            <Subtitle color="black">
              Seja bem-vindo novamente! <br />
              Por favor entre em sua conta utilizando seu login institucional
              <b> @professores.</b>
            </Subtitle>
          </DescriptionsGrid>

          <GridForm
            item
            xs={12}
            sm={12}
            md={12}
            lg={9}
            component="form"
            onSubmit={handleLogin}
          >
            <StyledInput
              id="email"
              label="E-mail"
              value={values.email}
              onChange={handleChange('email')}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
              autoFocus
              required
            />

            <StyledInput
              color="primary"
              id="password"
              label="Senha"
              type={values.showPassword ? 'text' : 'password'}
              value={values.password}
              onChange={handleChange('password')}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                    >
                      {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              required
              autoComplete="on"
            />

            {error && (
              <ErrorMessage style={{ marginBottom: '20px' }}>
                {error}
              </ErrorMessage>
            )}
            <Grid item align="center">
              <StyledButton
                loading={loading}
                type="submit"
                color="primary"
                variant="contained"
              >
                ENTRAR
              </StyledButton>
            </Grid>
          </GridForm>
        </Grid>
      </Grid>
    </StyledContainer>
  );
};

export default LoginPage;

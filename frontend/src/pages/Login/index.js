import React, { useState } from 'react';
import PropTypes from 'prop-types';

// COMPONENTS
import { Grid, InputAdornment, IconButton } from '@material-ui/core';
import ErrorMessage from '@components/Messages/error';

import {
  AccountCircle,
  Visibility,
  VisibilityOff,
  Lock,
} from '@material-ui/icons';

// ASSETS
import { ReactComponent as Illustration } from '@assets/login_illustration.svg';

// HOOKS
import useAuth from '@hooks/Auth';

import { HOME } from '@routes';
import {
  StyledContainer,
  DescriptionsGrid,
  Title,
  Subtitle,
  GridForm,
  StyledInput,
  StyledButton,
} from './style';

// ROTAS

const LoginPage = ({ history }) => {
  const { login } = useAuth();

  const [values, setValues] = useState({
    email: '',
    password: '',
    showPassword: false,
  });

  const [error, setError] = useState(false);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  return (
    <StyledContainer>
      <Grid container justify="center" alignItems="center">
        <Grid
          style={{ display: 'flex', justifyContent: 'center' }}
          item
          xs={12}
          sm={12}
          md={12}
          lg={6}
        >
          <Illustration />
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={6}>
          <DescriptionsGrid item xs={12}>
            <Title variant="h4" color="primary">
              Login
            </Title>
            <Subtitle color="primary">
              Seja bem-vindo novamente! <br />
              Por favor entre em sua conta logo abaixo.
            </Subtitle>
          </DescriptionsGrid>

          <GridForm
            item
            xs={12}
            component="form"
            onSubmit={async (e) => {
              e.preventDefault();
              const response = await login(values.email, values.password);
              if (response.status === 200) {
                history.push(HOME);
              } else {
                setError(response.response.data.error);
              }
            }}
          >
            <StyledInput
              color="primary"
              variant="outlined"
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
              variant="outlined"
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
              <StyledButton type="submit" color="primary" variant="contained">
                ENTRAR
              </StyledButton>
            </Grid>
          </GridForm>
        </Grid>
      </Grid>
    </StyledContainer>
  );
};

LoginPage.defaultProps = {};

LoginPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default LoginPage;

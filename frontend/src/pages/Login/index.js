import React, { useState, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { Grid } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { useGoogleLogin } from '@react-oauth/google';

// HOOKS
import useAuth from '@hooks/Auth';

import {
  StyledContainer,
  DescriptionsGrid,
  Title,
  Subtitle,
  StyledButton,
  LogoUTFPR,
} from './style';

const LoginPage = () => {
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const { enqueueSnackbar } = useSnackbar();

  const validationEmail = (email) => {
    const regexEmail = /^[A-Z0-9._%+-]+@professores+\.[A-Z]{2,}$/i;

    return regexEmail.test(email);
  };

  const fetchUserInfo = async (credential) => {
    setLoading(true);
    try {
      const res = await fetch('https://www.googleapis.com/userinfo/v2/me', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${credential}`,
        },
      });
      const data = await res.json();

      const { email } = data;
      if (validationEmail(email) || process.env.NODE_ENV === 'development') {
        await login(data);
        setLoading(false);
      } else {
        enqueueSnackbar('Você deve entrar com email @professores', {
          variant: 'error',
        });
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.warn(error);
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) => fetchUserInfo(tokenResponse.access_token),
  });

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
          <StyledButton
            loading={loading}
            type="submit"
            color="primary"
            variant="contained"
            onClick={() => googleLogin()}
          >
            <p>ENTRAR COM O GOOGLE</p>
            <GoogleIcon />
          </StyledButton>
        </Grid>
      </Grid>
    </StyledContainer>
  );
};

export default LoginPage;

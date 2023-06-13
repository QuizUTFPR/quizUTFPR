import React, { useEffect } from 'react';
import { AntDesign } from '@expo/vector-icons';

// EXPO AUTH
import { useAuthRequest } from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';

import useStudentAuth from '@hook/useStudentAuth';

// .env
import { expoClientId } from '../../../env';

// THEME
import theme from '../../styles/theme';

// STYLES
import {
  Container,
  ImageView,
  WrapperButton,
  StyledTitle,
  StyledParagraph,
  StyledButtonGradient,
  Logo,
} from './styles';

WebBrowser.maybeCompleteAuthSession();

const InitialScreen = ({ navigation }) => {
  const { login } = useStudentAuth();

  const [request, response, promptAsync] = useAuthRequest({
    androidClientId: expoClientId,
  });

  const fetchUserInfo = async (token) => {
    try {
      const data = await fetch('https://www.googleapis.com/userinfo/v2/me', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { email, name, picture } = await data.json();

      await login({ email, name, picture, isLocalImage: false });
    } catch (error) {
      console.warn(error);
    }
  };

  useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      fetchUserInfo(authentication.accessToken);
    }
  }, [response]);

  return (
    <Container fill="purple">
      <ImageView>
        <Logo />
        <StyledTitle fill="white">Bem-Vindo!</StyledTitle>
        <StyledParagraph fill="white">
          Aqui você poderá encontrar os quizzes criados por seus professores
          para respondê-los e aprimorar seus conhecimentos.
        </StyledParagraph>

        <WrapperButton>
          <StyledButtonGradient
            variant="primary"
            colors={theme.color.gradients.secondary}
            onPress={() => promptAsync()}
            disabled={!request}
            title="ENTRAR COM GOOGLE"
          >
            <AntDesign name="google" size={24} color="white" />
          </StyledButtonGradient>
        </WrapperButton>
      </ImageView>
    </Container>
  );
};

export default InitialScreen;

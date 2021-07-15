import React from 'react';
import ButtonGradient from '@components/ButtonGradient';

// STYLES
import {
  Container,
  ImageView,
  WrapperButton,
  StyledTitle,
  StyledParagraph,
  Logo,
} from './styles';

const InitialScreen = ({ navigation }) => (
  <Container fill="purple">
    <ImageView>
      <Logo />
      <StyledTitle fill="white">Bem-Vindo!</StyledTitle>
      <StyledParagraph fill="white">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the standard dummy text ever since the
        1500s, when an unknown printer took a galley of type and scrambled it to
        make a type specimen book.
      </StyledParagraph>

      <WrapperButton>
        <ButtonGradient
          variant="primary"
          colors={['#fdb646', '#f99f4c']}
          onPress={() => navigation.navigate('Login')}
          icon="login-variant"
        >
          ENTRAR
        </ButtonGradient>
      </WrapperButton>
      <WrapperButton>
        <ButtonGradient
          // style={{ borderRadius: 30 }}
          variant="primary"
          colors={['#fdb646', '#f99f4c']}
          onPress={() => navigation.navigate('Register')}
          icon="account-plus"
        >
          CRIAR CONTA
        </ButtonGradient>
      </WrapperButton>
    </ImageView>
  </Container>
);

export default InitialScreen;

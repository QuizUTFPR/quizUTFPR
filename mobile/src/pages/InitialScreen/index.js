import React from 'react';
import ButtonGradient from '@components/ButtonGradient';

// COMPONENTS
import Container from '@components/Container';

// STYLES
import {
  BloobsBackground,
  ImageView,
  StyledLoginIllustration,
  WrapperButton,
  StyledTitle,
  StyledParagraph,
} from './styles';

const InitialScreen = ({ navigation }) => (
  <Container>
    <BloobsBackground fill={'#eaebff'} />
    <ImageView>
      <StyledLoginIllustration />

      <StyledTitle color="primary">Bem-Vindo!</StyledTitle>
      <StyledParagraph color="primary">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the standard dummy text ever since the
        1500s, when an unknown printer took a galley of type and scrambled it to
        make a type specimen book.{' '}
      </StyledParagraph>

      <WrapperButton>
        <ButtonGradient
          variant="primary"
          onPress={() => navigation.navigate('Login')}
          icon="login-variant"
        >
          ENTRAR
        </ButtonGradient>
      </WrapperButton>
      <WrapperButton>
        <ButtonGradient
          variant="primary"
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

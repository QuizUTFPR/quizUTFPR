import React from 'react';
import ButtonGradient from '@components/ButtonGradient';
import LottieView from 'lottie-react-native';

// COMPONENTS
import Container from '@components/Container';

// STYLES
import {
  BloobsBackground,
  ImageView,
  AnimationView,
  WrapperButton,
  StyledTitle,
  StyledParagraph,
} from './styles';

const Home = ({ navigation }) => (
  <Container>
    <BloobsBackground fill={'#eaebff'} />
    <ImageView>
      <AnimationView>
        <LottieView
          autoPlay
          loop
          style={{ flex: 1 }}
          speed={1}
          // eslint-disable-next-line global-require
          source={require('@assets/lottie/initialScreen.json')}
        />
      </AnimationView>

      <StyledTitle fill="black">Bem-Vindo!</StyledTitle>
      <StyledParagraph fill="black">
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

export default Home;

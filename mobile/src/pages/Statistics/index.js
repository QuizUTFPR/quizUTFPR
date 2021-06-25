import React from 'react';
import LottieView from 'lottie-react-native';

// COMPONENTS
import ButtonGradient from '@components/ButtonGradient';

// STYLES
import {
  Container,
  ImageView,
  InformationsCard,
  Body,
  AnimationView,
  StyledTitle,
  StyledText,
  Footer,
  RedoButton,
  RedoButtonText,
} from './styles';

const fakeData = {
  amountOfQuestions: 25,
  hits: 15,
  points: 100,
};

const informationsBasedOnHits = {
  amazing: {
    title: 'ESPETACULAR!',
    subtitle: 'Você foi muito bem.',
    // eslint-disable-next-line global-require
    animation: require('@assets/lottie/initialScreen.json'),
  },
  notBad: {
    title: 'NADA MAL!',
    subtitle: 'Você foi bem.',
    // eslint-disable-next-line global-require
    animation: require('@assets/lottie/initialScreen.json'),
  },
  youCanDoItBetter: {
    title: 'NÃO FOI DESSA VEZ!',
    subtitle: 'Tente novamente, você consegue.',
    // eslint-disable-next-line global-require
    animation: require('@assets/lottie/initialScreen.json'),
  },
};

const Statistics = () => {
  const hitsPercentage = (fakeData.hits * 100) / fakeData.amountOfQuestions;

  const correctInformations = () => {
    if (hitsPercentage >= 80) return informationsBasedOnHits.amazing;
    if (hitsPercentage >= 50) return informationsBasedOnHits.notBad;
    return informationsBasedOnHits.youCanDoItBetter;
  };

  return (
    <Container fill="purple">
      <ImageView>
        <InformationsCard>
          <Body>
            <StyledTitle>{correctInformations().title}</StyledTitle>
            <StyledText>{correctInformations().subtitle}</StyledText>
            <AnimationView>
              <LottieView
                autoPlay
                loop
                style={{ flex: 1 }}
                speed={1}
                source={correctInformations().animation}
              />
            </AnimationView>
            <StyledText>
              Questões corretas: {fakeData.hits}/{fakeData.amountOfQuestions}
            </StyledText>
            <StyledText>Pontuação: {fakeData.points}</StyledText>
          </Body>
          <Footer>
            <RedoButton>
              <RedoButtonText fill="black">REFAZER</RedoButtonText>
            </RedoButton>
            <ButtonGradient variant="primary" colors={['#fdb646', '#f99f4c']}>
              CONCLUIR
            </ButtonGradient>
          </Footer>
        </InformationsCard>
      </ImageView>
    </Container>
  );
};

export default Statistics;

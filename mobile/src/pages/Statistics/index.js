import React from 'react';
import LottieView from 'lottie-react-native';
import { CommonActions } from '@react-navigation/native';

// HOOKS
import useQuestions from '@hook/useQuestion';

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

const informationsBasedOnHits = {
  amazing: {
    title: 'ESPETACULAR!',
    subtitle: 'Você foi muito bem.',
    // eslint-disable-next-line global-require
    animation: require('@assets/lottie/congratulations.json'),
  },
  notBad: {
    title: 'NADA MAL!',
    subtitle: 'Você foi bem.',
    // eslint-disable-next-line global-require
    animation: require('@assets/lottie/not_bad.json'),
  },
  youCanDoItBetter: {
    title: 'NÃO FOI DESSA VEZ!',
    subtitle: 'Tente novamente, você consegue.',
    // eslint-disable-next-line global-require
    animation: require('@assets/lottie/try_again.json'),
  },
};

const Statistics = ({ route, navigation }) => {
  const { amountOfQuestion } = useQuestions();
  const { hit_amount: hitAmount, score } = route.params;

  const hitsPercentage = (hitAmount * 100) / amountOfQuestion;

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
              Questões corretas: {hitAmount}/{amountOfQuestion}
            </StyledText>
            <StyledText>Pontuação: {score}</StyledText>
          </Body>
          <Footer>
            <RedoButton>
              <RedoButtonText fill="black">REFAZER</RedoButtonText>
            </RedoButton>
            <ButtonGradient
              variant="primary"
              onPress={() =>
                navigation.dispatch(
                  CommonActions.reset({
                    index: 0,
                    routes: [{ name: 'Home' }],
                  })
                )
              }
              colors={['#fdb646', '#f99f4c']}
            >
              CONCLUIR
            </ButtonGradient>
          </Footer>
        </InformationsCard>
      </ImageView>
    </Container>
  );
};

export default Statistics;

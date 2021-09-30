import React, { useEffect } from 'react';
import LottieView from 'lottie-react-native';
import { CommonActions, useNavigation } from '@react-navigation/native';

// HOOKS
import useQuestions from '@hook/useQuestion';

// COMPONENTS
import ButtonGradient from '@components/ButtonGradient';

// LOTTIE
import Congratulations from '@assets/lottie/congratulations.json';
import NotBad from '@assets/lottie/not_bad.json';
import TryAgain from '@assets/lottie/try_again.json';

// THEME
import theme from '../../styles/theme';

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
    animation: Congratulations,
  },
  notBad: {
    title: 'NADA MAL!',
    subtitle: 'Você foi bem.',
    animation: NotBad,
  },
  youCanDoItBetter: {
    title: 'NÃO FOI DESSA VEZ!',
    subtitle: 'Tente novamente, você consegue.',
    animation: TryAgain,
  },
};

const Statistics = ({ route }) => {
  const navigation = useNavigation();

  const { amountOfQuestion } = useQuestions();
  const { hit_amount: hitAmount, score } = route.params;

  const hitsPercentage = (hitAmount * 100) / amountOfQuestion;

  const correctInformations = () => {
    if (hitsPercentage >= 80) return informationsBasedOnHits.amazing;
    if (hitsPercentage >= 50) return informationsBasedOnHits.notBad;
    return informationsBasedOnHits.youCanDoItBetter;
  };

  useEffect(
    () =>
      navigation.addListener('beforeRemove', (e) => {
        if (e.data.action.type === 'POP' || e.data.action.type === 'RESET') {
          navigation.dispatch(e.data.action);
        } else {
          e.preventDefault();
        }
      }),
    [navigation]
  );

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
            <StyledText>Pontuação: {score.toFixed(2)}</StyledText>
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
                    routes: [{ name: 'HomeMenuDrawer' }],
                  })
                )
              }
              colors={theme.color.gradients.orange}
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

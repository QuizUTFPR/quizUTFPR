import React, { useRef } from 'react';
import { IconButton, useTheme } from 'react-native-paper';
import LottieView from 'lottie-react-native';

// STYLES
import {
  QuestionContainer,
  QuestionWrapper,
  InformationsWrapper,
  Header,
  Footer,
  CurrentQuestion,
  QuestionDescription,
  QuestionImage,
  QuestionText,
  AnswerContainer,
  AnswerText,
  ConfirmButton,
  SkeepButton,
  ScrollWrapper,
} from './styles';

const fakeAnswers = ['Amarelo', 'Roxo', 'Azul', 'Tijolo'];

const Question = () => {
  const actionAnimation = useRef(false);
  const { label } = useTheme();

  React.useEffect(() => {
    if (actionAnimation) {
      console.log('montour');
    }
  }, []);

  return (
    <>
      <LottieView
        ref={actionAnimation}
        autoPlay
        loop={false}
        style={{ zIndex: 9999 }}
        resizeMode="cover"
        speed={1}
        // eslint-disable-next-line global-require
        source={require('@assets/countdown.json')}
      />

      <QuestionContainer>
        <QuestionWrapper>
          <Header>
            <IconButton color="white" icon="close" onPress={() => {}} />
            <CurrentQuestion fontSize={label.fontSize}>1/20</CurrentQuestion>
            <IconButton color="white" icon="timer" onPress={() => {}} />
          </Header>

          <InformationsWrapper>
            <ScrollWrapper>
              <QuestionDescription>
                {/* eslint-disable-next-line global-require */}
                <QuestionImage source={require('@assets/icon.png')} />
                <QuestionText fontSize={label.fontSize}>
                  Qual a cor do líquido de Erlenmeyer?
                </QuestionText>
              </QuestionDescription>

              {fakeAnswers.map((answer) => (
                <AnswerContainer key={answer}>
                  <AnswerText fontSize={label.fontSize}>{answer}</AnswerText>
                </AnswerContainer>
              ))}
            </ScrollWrapper>
            <Footer>
              <SkeepButton mode="text" onPress={() => {}}>
                Pular
              </SkeepButton>
              <ConfirmButton onPress={() => {}}>Confirmar</ConfirmButton>
            </Footer>
          </InformationsWrapper>
        </QuestionWrapper>
        <LottieView
          autoPlay
          loop
          speed={5}
          style={{ zIndex: -1 }}
          // eslint-disable-next-line global-require
          source={require('@assets/bg2.json')}
        />
      </QuestionContainer>
    </>
  );
};

export default Question;

import React, { useRef, useState, useEffect } from 'react';
import { IconButton, useTheme } from 'react-native-paper';
import LottieView from 'lottie-react-native';
import { Animated, Dimensions } from 'react-native';

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
  WrapperProgress,
  Progress,
  TextTimer,
  ProgressBG,
} from './styles';

const fakeAnswers = ['Amarelo', 'Roxo', 'Azul', 'Tijolo'];

const Question = () => {
  const widthAnimation = useRef(
    new Animated.Value(Dimensions.get('screen').width)
  ).current;
  const { label } = useTheme();

  const [timer, setTimer] = useState({
    canStart: false,
    seconds: 30,
    secondImmutable: 10,
    interval: null,
  });

  useEffect(() => {
    if (timer.canStart) {
      setTimer((prev) => ({
        ...prev,
        interval: setInterval(() => {
          setTimer((prevState) => ({
            ...prevState,
            seconds: prevState.seconds > 0 ? prevState.seconds - 1 : 0,
          }));
        }, 1000),
      }));

      Animated.timing(widthAnimation, {
        toValue: 0,
        duration: timer.seconds * 1000,
        useNativeDriver: false,
      }).start();
    }
    return () => clearInterval(timer.interval);
  }, [timer.canStart]);

  useEffect(() => {
    if (timer.seconds === 0) {
      clearInterval(timer.interval);
    }
  }, [timer.seconds]);

  return (
    <>
      <LottieView
        autoPlay
        loop={false}
        style={{ zIndex: 9999 }}
        resizeMode="cover"
        speed={1}
        // eslint-disable-next-line global-require
        source={require('@assets/countdown.json')}
        onAnimationFinish={() =>
          setTimer((prevState) => ({ ...prevState, canStart: true }))
        }
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
        <WrapperProgress>
          <TextTimer>{timer.seconds}</TextTimer>
          <ProgressBG progress={1} color="red" />
          <Progress
            style={{
              width: widthAnimation,
            }}
            as={Animated.View}
            widthTimer={timer.widthTimer}
            progress={1}
            color="red"
          />
        </WrapperProgress>

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

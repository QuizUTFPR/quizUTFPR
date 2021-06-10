import React, { useRef, useState, useEffect } from 'react';
import { IconButton, useTheme, Button } from 'react-native-paper';
import LottieView from 'lottie-react-native';
import { Animated, Dimensions, Text } from 'react-native';

// HOOKS
import useQuestions from '@hook/useQuestion';

// STYLES
import ButtonGradient from '@components/ButtonGradient';
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
  ScrollWrapper,
  WrapperProgress,
  Progress,
  TextTimer,
  ProgressBG,
} from './styles';

const fakeAnswers = ['Amarelo', 'Roxo', 'Azul', 'Tijolo'];

const Question = () => {
  const {
    questions,
    requestQuestion,
    handleSetCheckedAnswer,
    handleSaveRequestQuestionOnDatabase,
  } = useQuestions();

  const widthAnimation = useRef(
    new Animated.Value(Dimensions.get('screen').width)
  ).current;
  const { label } = useTheme();

  const [timer, setTimer] = useState({
    seconds: 30,
    secondImmutable: 10,
    interval: null,
  });

  useEffect(() => {
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

    return () => clearInterval(timer.interval);
  }, []);

  useEffect(() => {
    if (timer.seconds === 0) {
      clearInterval(timer.interval);
    }
  }, [timer.seconds]);

  return (
    <QuestionContainer>
      <QuestionWrapper>
        <Header>
          <IconButton color="white" icon="close" onPress={() => {}} />
          <CurrentQuestion fontSize={label.fontSize}>1/20</CurrentQuestion>
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

            {fakeAnswers.map((answer, index) => (
              <AnswerContainer
                key={answer}
                checked={requestQuestion.checkedAnswer[index]}
                onPress={() => handleSetCheckedAnswer(index)}
              >
                <AnswerText
                  checked={requestQuestion.checkedAnswer[index]}
                  fontSize={label.fontSize}
                >
                  {answer}
                </AnswerText>
              </AnswerContainer>
            ))}
          </ScrollWrapper>
          <Footer>
            <ConfirmButton
              fontSize={label.fontSize}
              onPress={handleSaveRequestQuestionOnDatabase}
            >
              Confirmar
            </ConfirmButton>
          </Footer>
        </InformationsWrapper>
      </QuestionWrapper>
      <WrapperProgress>
        <TextTimer fontSize={label.fontSize}>{timer.seconds}</TextTimer>
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
    </QuestionContainer>
  );
};

export default Question;

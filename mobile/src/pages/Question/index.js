import React, { useRef, useState, useEffect } from 'react';
import { IconButton, useTheme } from 'react-native-paper';
import {
  Animated,
  Dimensions,
  ImageBackground,
  SafeAreaView,
} from 'react-native';
import LottieView from 'lottie-react-native';

// HOOKS
import useQuestions from '@hook/useQuestion';

// COMPONENTS
import image from '@assets/FUNDO.png';
import LinearContainer from '@components/LinearContainer';
import Dialog from '@components/Dialog';
import Timer from './components/Timer';

// STYLES
import {
  QuestionWrapper,
  InformationsWrapper,
  Header,
  Footer,
  CurrentQuestionView,
  CurrentQuestion,
  QuestionDescription,
  QuestionImage,
  QuestionText,
  AnswerContainer,
  AnswerText,
  ConfirmButton,
  ScrollWrapper,
} from './styles';

const Question = () => {
  const {
    quizData,
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

  const [visible, setVisible] = useState(false);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

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

    console.log(
      'questoes',
      quizData.questions[quizData.indexOnScreen].image_question.url
    );

    return () => clearInterval(timer.interval);
  }, []);

  useEffect(() => {
    if (timer.seconds === 0) {
      clearInterval(timer.interval);
      showDialog();
    }
  }, [timer.seconds]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearContainer>
        <ImageBackground
          style={{
            flex: 1,
            resizeMode: 'cover',
            justifyContent: 'center',
          }}
          source={image}
        >
          <QuestionWrapper>
            <Header>
              <IconButton color="white" icon="close" onPress={() => {}} />
              <CurrentQuestionView>
                <CurrentQuestion fontSize={label.fontSize}>
                  {quizData.indexOnScreen + 1}/{quizData.questions.length}
                </CurrentQuestion>
              </CurrentQuestionView>
            </Header>

            <InformationsWrapper>
              <ScrollWrapper>
                <QuestionDescription>
                  {/* eslint-disable-next-line global-require */}
                  <QuestionImage source={require('@assets/icon.png')} />
                  <QuestionText fontSize={label.fontSize}>
                    {quizData.questions[quizData.indexOnScreen].title}
                  </QuestionText>
                </QuestionDescription>

                {quizData.questions[quizData.indexOnScreen].answer.map(
                  (answer, index) => (
                    <AnswerContainer
                      key={answer.id}
                      checked={requestQuestion.checkedAnswer[index]}
                      onPress={() => handleSetCheckedAnswer(index)}
                    >
                      <AnswerText
                        checked={requestQuestion.checkedAnswer[index]}
                        fontSize={label.fontSize}
                      >
                        {answer.title}
                      </AnswerText>
                    </AnswerContainer>
                  )
                )}
              </ScrollWrapper>
              <Footer>
                <ConfirmButton
                  fontSize={label.fontSize}
                  onPress={() => handleSaveRequestQuestionOnDatabase()}
                >
                  CONFIRMAR
                </ConfirmButton>
              </Footer>
            </InformationsWrapper>
          </QuestionWrapper>

          <Timer
            fontSize={label.fontSize}
            widthAnimation={widthAnimation}
            timerState={timer}
          />
        </ImageBackground>
      </LinearContainer>
      <Dialog
        title="OOOPS!!!"
        buttonLabel="TUDO BEM :("
        visible={visible}
        hideDialog={hideDialog}
      >
        <LottieView
          autoPlay
          loop
          style={{ width: 150 }}
          resizeMode="cover"
          speed={1}
          // eslint-disable-next-line global-require
          source={require('@assets/sad_emote.json')}
        />
        <QuestionText fontSize={label.fontSize}>
          Infelizmente o tempo de resposta esgotou...
        </QuestionText>
      </Dialog>
    </SafeAreaView>
  );
};

export default Question;

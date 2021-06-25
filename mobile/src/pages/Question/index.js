import React, { useState, useEffect } from 'react';
import { Animated, Dimensions, ImageBackground } from 'react-native';
import LottieView from 'lottie-react-native';
import { useNavigation, StackActions } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

// HOOKS
import useQuestions from '@hook/useQuestion';

// COMPONENTS
// import image from '@assets/FUNDO.png';
import image2 from '@assets/patterns/halftone.png';

import LinearContainer from '@components/LinearContainer';
import Dialog from '@components/Dialog';
import Timer from './components/Timer';

// STYLES
import {
  Container,
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
  ExitButtonWrapper,
  StyledIconButton,
} from './styles';

const Question = () => {
  const {
    quizData,
    requestQuestion,
    handleSetCheckedAnswer,
    handleSaveRequestQuestionOnDatabase,
    changeToNextQuestion,
    initialRequestQuestion,
  } = useQuestions();

  const navigation = useNavigation();

  const [widthAnimation, setWidthAnimation] = useState(
    new Animated.Value(Dimensions.get('screen').width)
  );

  const [timer, setTimer] = useState({
    seconds: null,
    interval: null,
  });

  const [visible, setVisible] = useState(false);
  const [isConfirmExitVisible, setIsConfirmExitVisible] = useState(false);

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const showConfirmExit = () => setIsConfirmExitVisible(true);
  const hideConfirmExit = () => setIsConfirmExitVisible(false);

  const handleGoToNextQuestionAndSave = async () => {
    if (
      JSON.stringify(initialRequestQuestion) ===
        JSON.stringify(requestQuestion) &&
      timer.seconds > 0
    ) {
      console.log('Avisar que o usuário deve escolher sua resposta!');
    } else {
      await handleSaveRequestQuestionOnDatabase(timer.seconds);
      changeToNextQuestion();
      setWidthAnimation(new Animated.Value(Dimensions.get('screen').width));
    }
  };

  const handleGoNextQuestion = async () => {
    hideDialog();
    await handleSaveRequestQuestionOnDatabase(timer.seconds);
    handleGoToNextQuestionAndSave();
  };

  useEffect(() => {
    clearInterval(timer.interval);
    setTimer(
      {
        seconds: quizData.questions[quizData.indexOnScreen].timer,
        interval: setInterval(() => {
          setTimer((prevState) => ({
            ...prevState,
            seconds: prevState.seconds > 0 ? prevState.seconds - 1 : 0,
          }));
        }, 1000),
      },
      [quizData]
    );

    Animated.timing(widthAnimation, {
      toValue: 0,
      duration: quizData.questions[quizData.indexOnScreen].timer * 1000,
      useNativeDriver: false,
    }).start();

    return () => clearInterval(timer.interval);
  }, [quizData, widthAnimation]);

  useEffect(() => {
    if (timer.seconds === 0) {
      clearInterval(timer.interval);
      showDialog();
    }
  }, [timer.seconds]);

  useEffect(
    () =>
      navigation.addListener('beforeRemove', (e) => {
        // Prevent default behavior of leaving the screen
        if (e.data.action.type === 'POP') {
          hideConfirmExit();
          navigation.dispatch(e.data.action);
        } else {
          e.preventDefault();
          showConfirmExit();
        }

        return () => clearInterval(timer.interval);
      }),
    [navigation]
  );

  return (
    <Container>
      <LinearContainer>
        <ImageBackground
          style={{
            flex: 1,
            resizeMode: 'cover',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
          }}
          source={image2}
        >
          <QuestionWrapper>
            <Header>
              <ExitButtonWrapper>
                <StyledIconButton onPress={() => showConfirmExit()}>
                  <AntDesign name="close" size={24} color="white" />
                </StyledIconButton>
              </ExitButtonWrapper>

              <CurrentQuestionView>
                <CurrentQuestion>
                  {quizData.indexOnScreen + 1}/{quizData.questions.length}
                </CurrentQuestion>
              </CurrentQuestionView>
            </Header>

            <InformationsWrapper>
              <ScrollWrapper>
                <QuestionDescription>
                  {/* eslint-disable-next-line global-require */}
                  <QuestionImage source={require('@assets/icon.png')} />
                  <QuestionText>
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
                      >
                        {answer.title}
                      </AnswerText>
                    </AnswerContainer>
                  )
                )}
              </ScrollWrapper>
              <Footer>
                <ConfirmButton onPress={handleGoToNextQuestionAndSave}>
                  CONFIRMAR
                </ConfirmButton>
              </Footer>
            </InformationsWrapper>
          </QuestionWrapper>

          <Timer widthAnimation={widthAnimation} timerState={timer} />
        </ImageBackground>
      </LinearContainer>

      <Dialog
        title="OOOPS!!!"
        firstButtonLabel="TUDO BEM :("
        visible={visible}
        firstButtonOnPress={handleGoNextQuestion}
        hideDialog={() => {}}
        lottieAnimation={
          <LottieView
            autoPlay
            loop
            style={{ width: 150 }}
            resizeMode="cover"
            speed={1}
            // eslint-disable-next-line global-require
            source={require('@assets/lottie/sad_emote.json')}
          />
        }
      >
        Infelizmente o tempo de resposta esgotou...
      </Dialog>

      <Dialog
        title="JÁ VAI? ESTÁ CEDO!"
        visible={isConfirmExitVisible}
        hideDialog={hideConfirmExit}
        firstButtonOnPress={hideConfirmExit}
        secondButtonOnPress={() => {
          navigation.dispatch(StackActions.pop(3));
        }}
        firstButtonLabel="VOLTAR"
        secondButtonLabel="SAIR"
        lottieAnimation={
          <LottieView
            autoPlay
            loop={false}
            style={{ width: 150 }}
            resizeMode="cover"
            speed={0.5}
            // eslint-disable-next-line global-require
            source={require('@assets/lottie/close_animation.json')}
          />
        }
      >
        Tem certeza que quer sair? Seu progresso será salvo para que você
        continue depois...
      </Dialog>
    </Container>
  );
};

export default Question;

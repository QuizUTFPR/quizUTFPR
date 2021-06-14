import React, { useState, useEffect } from 'react';
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
    changeToNextQuestion,
    initialRequestQuestion,
  } = useQuestions();

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

  // const showConfirmExit = () => setIsConfirmExitVisible(true);
  const hideConfirmExit = () => setIsConfirmExitVisible(false);
  const handleConfirmExit = () => setIsConfirmExitVisible(false);

  const handleGoToNextQuestionAndSave = async () => {
    if (
      JSON.stringify(initialRequestQuestion) === JSON.stringify(requestQuestion)
    ) {
      console.log('Avisar que o usuário deve escolher sua resposta!');
    } else {
      await handleSaveRequestQuestionOnDatabase();
      changeToNextQuestion();
      setWidthAnimation(new Animated.Value(Dimensions.get('screen').width));
    }
  };

  useEffect(() => {
    clearInterval(timer.interval);
    setTimer({
      seconds: quizData.questions[quizData.indexOnScreen].timer,
      interval: setInterval(() => {
        setTimer((prevState) => ({
          ...prevState,
          seconds: prevState.seconds > 0 ? prevState.seconds - 1 : 0,
        }));
      }, 1000),
    });

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

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearContainer>
        <ImageBackground
          style={{
            flex: 1,
            resizeMode: 'cover',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
          }}
          source={image}
        >
          <QuestionWrapper>
            <Header>
              {/* <IconButton
                color="white"
                icon="close"
                onPress={() => {
                  showConfirmExit();
                }}
              /> */}
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
        hideDialog={hideDialog}
        lottieAnimation={
          <LottieView
            autoPlay
            loop
            style={{ width: 150 }}
            resizeMode="cover"
            speed={1}
            // eslint-disable-next-line global-require
            source={require('@assets/sad_emote.json')}
          />
        }
      >
        Infelizmente o tempo de resposta esgotou...
      </Dialog>

      <Dialog
        title="JÁ VAI? ESTÁ CEDO!"
        visible={isConfirmExitVisible}
        hideDialog={hideConfirmExit}
        secondButtonOnPress={handleConfirmExit}
        firstButtonLabel="CANCELAR"
        secondButtonLabel="SAIR"
        lottieAnimation={
          <LottieView
            autoPlay
            loop={false}
            style={{ width: 150 }}
            resizeMode="cover"
            speed={1}
            // eslint-disable-next-line global-require
            source={require('@assets/close_animation.json')}
          />
        }
      >
        Tem certeza que quer sair? Seu progresso será salvo para que você
        continue depois...
      </Dialog>
    </SafeAreaView>
  );
};

export default Question;

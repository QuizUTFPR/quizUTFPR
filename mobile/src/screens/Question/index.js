import React, { useState, useEffect } from 'react';
import { Animated, Dimensions, ImageBackground } from 'react-native';
import LottieView from 'lottie-react-native';
import { useNavigation, StackActions } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

// HOOKS
import useQuestions from '@hook/useQuestion';

// LOTTIE
import SadEmote from '@assets/lottie/sad_emote.json';
import CloseAnimation from '@assets/lottie/close_animation.json';

// COMPONENTS
import Toast from '@components/Toast';
import { MathJaxSvg } from 'react-native-mathjax-html-to-svg';
import image2 from '@assets/patterns/halftone.png';
import LinearContainer from '@components/LinearContainer';
import Dialog from '@components/Dialog';
import Timer from './components/Timer';

// THEME
import theme from '../../styles/theme';

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
  AnswerContainer,
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
    amountOfQuestion,
    amountAlreadyAnswered,
    noTime,
  } = useQuestions();

  const navigation = useNavigation();

  const [widthAnimation, setWidthAnimation] = useState(
    new Animated.Value(Dimensions.get('screen').width)
  );

  const [timer, setTimer] = useState({
    seconds: 30,
    interval: null,
  });

  const [showToast, setShowToast] = useState({
    open: false,
    message: '',
  });

  const handleCloseToast = () => {
    setShowToast({
      open: false,
      message: '',
    });
  };

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
      !noTime &&
      timer.seconds > 0
    ) {
      setShowToast({
        open: true,
        message: 'Marque ao menos uma alternativa!',
      });
    } else {
      await handleSaveRequestQuestionOnDatabase(timer.seconds);
      const responseFinished = await changeToNextQuestion();

      if (responseFinished) {
        clearInterval(timer.interval);
        navigation.navigate('Statistics', responseFinished);
      }
      setWidthAnimation(new Animated.Value(Dimensions.get('screen').width));
    }
  };

  const handleGoNextQuestion = async () => {
    hideDialog();
    handleGoToNextQuestionAndSave();
  };

  useEffect(() => {
    if (!noTime) {
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
    }

    return () => clearInterval(timer.interval);
  }, [quizData]);

  useEffect(() => {
    if (!noTime) {
      Animated.timing(widthAnimation, {
        toValue: 0,
        duration: quizData.questions[quizData.indexOnScreen].timer * 1000,
        useNativeDriver: false,
      }).start();
    }

    return () => clearInterval(timer.interval);
  }, [widthAnimation]);

  useEffect(() => {
    if (!noTime && timer.seconds === 0) {
      clearInterval(timer.interval);
      showDialog();
    }
  }, [timer.seconds]);

  useEffect(
    () =>
      navigation.addListener('beforeRemove', (e) => {
        if (e.data.action.type === 'POP' || e.data.action.type === 'RESET') {
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
                  {amountAlreadyAnswered + 1}/{amountOfQuestion}
                </CurrentQuestion>
              </CurrentQuestionView>
            </Header>

            <InformationsWrapper>
              <ScrollWrapper>
                <QuestionDescription>
                  <QuestionImage
                    source={
                      quizData.questions[quizData.indexOnScreen]?.image?.url
                        .length
                        ? {
                            uri: quizData.questions[quizData.indexOnScreen]
                              ?.image?.url,
                          }
                        : null
                    }
                  />
                  <MathJaxSvg
                    fontSize={theme.fontSize.normal}
                    color="black"
                    fontCache
                    style={{
                      justifyContent: 'center',
                    }}
                  >
                    {`<p style="
                      font-family: PoppinsBold;
                      text-align: center;
                      margin-top: 20px;
                    ">${quizData.questions[quizData.indexOnScreen].title}</p>`}
                  </MathJaxSvg>
                </QuestionDescription>

                {quizData.questions[quizData.indexOnScreen].answer.map(
                  (answer, index) => (
                    <AnswerContainer
                      key={answer.id}
                      checked={requestQuestion.checkedAnswer[index]}
                      onPress={() => handleSetCheckedAnswer(index)}
                    >
                      <MathJaxSvg
                        fontSize={theme.fontSize.normal}
                        color={
                          requestQuestion.checkedAnswer[index]
                            ? 'white'
                            : theme.color.blackRussian
                        }
                        fontCache
                        style={{
                          justifyContent: 'center',
                        }}
                      >
                        {`<p  style="
                          font-family: PoppinsSemiBold;
                          text-align: center;
                          padding: 5px 0;
                        ">${`${answer.title}`}</p>`}
                      </MathJaxSvg>
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

          {!noTime && (
            <Timer widthAnimation={widthAnimation} timerState={timer} />
          )}
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
            source={SadEmote}
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
          clearInterval(timer.interval);
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
            source={CloseAnimation}
          />
        }
      >
        Tem certeza que quer sair? Seu progresso será salvo para que você
        continue depois...
      </Dialog>

      <Toast
        type="warning"
        handleClose={handleCloseToast}
        open={showToast.open}
        timeToErase={1000}
      >
        {showToast.message}
      </Toast>
    </Container>
  );
};

export default Question;

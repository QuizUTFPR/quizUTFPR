/* eslint-disable global-require */
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';

// API
import api from '@api';

// COMPONENTS
import Dialog from '@components/Dialog';

// HOOKS
import useQuestions from '@hook/useQuestion';

// STYLES
import {
  DetailsContainer,
  QuizDescriptionHeader,
  StyledImageBackground,
  GoBackButtonWrapper,
  StyledIconButton,
  StyledText,
  PlayButtonWrapper,
  StyledScrollView,
  BodyDescription,
  StyledTitle,
  StyledDescriptionText,
  TagsContainer,
  StyledTag,
  ButtonStyled,
  ResumeButtonWrapper,
  GiveUPButtonWraper,
  ButtonWrapper,
  StyledPIN,
  QuizProgress,
  StyledTitleProgress,
  StyledTextProgress,
} from './styles';

const QuizDescription = ({ route }) => {
  // eslint-disable-next-line no-unused-vars
  const { idStudentQuiz, questionAmount, studentChoicesAmount, quiz } =
    route.params;
  const { title, description, tags, id, pin } = quiz;

  const [visibleGiveUPModal, setVisibleGivUPModal] = useState(false);

  const [studentQuizID, setStudentQuizID] = useState(idStudentQuiz);
  const { getQuestionsOfQuizFromDatabase } = useQuestions();
  const navigation = useNavigation();

  const startQuizAndGetAllQuestions = async () => {
    const { data } = await api.post('/studentQuiz/startQuiz', { quiz_id: id });

    await getQuestionsOfQuizFromDatabase(id, data.id);
    navigation.navigate('CountDown');
  };

  const continueQuizAndGetAllQuestions = async () => {
    await getQuestionsOfQuizFromDatabase(id, studentQuizID);
    navigation.navigate('CountDown');
  };

  const giveUPQuiz = async () => {
    await api.put('/studentQuiz/finishQuiz', {
      quiz_id: id,
      id_student_quiz: studentQuizID,
    });

    setStudentQuizID(null);
  };

  return (
    <>
      <DetailsContainer fill="white">
        <QuizDescriptionHeader>
          <StyledImageBackground source={require('@assets/teste.jpg')}>
            <GoBackButtonWrapper>
              <StyledIconButton onPress={() => navigation.goBack()}>
                <Ionicons name="chevron-back" size={32} color="white" />
              </StyledIconButton>
            </GoBackButtonWrapper>
            {studentQuizID ? (
              <ButtonWrapper resume>
                <ButtonStyled onPress={() => setVisibleGivUPModal(true)}>
                  <GiveUPButtonWraper>
                    <StyledText fill="white">DESISTIR</StyledText>
                  </GiveUPButtonWraper>
                </ButtonStyled>
                <ButtonStyled onPress={continueQuizAndGetAllQuestions}>
                  <ResumeButtonWrapper>
                    <StyledIconButton>
                      <Ionicons
                        name="ios-play-circle"
                        size={32}
                        color="white"
                      />
                    </StyledIconButton>
                    <StyledText fill="white">CONTINUAR</StyledText>
                  </ResumeButtonWrapper>
                </ButtonStyled>
              </ButtonWrapper>
            ) : (
              <ButtonWrapper resume={false}>
                <ButtonStyled onPress={startQuizAndGetAllQuestions}>
                  <PlayButtonWrapper>
                    <StyledIconButton>
                      <Ionicons
                        name="ios-play-circle"
                        size={32}
                        color="white"
                      />
                    </StyledIconButton>
                    <StyledText fill="white">JOGAR</StyledText>
                  </PlayButtonWrapper>
                </ButtonStyled>
              </ButtonWrapper>
            )}
          </StyledImageBackground>
        </QuizDescriptionHeader>

        <StyledScrollView>
          <BodyDescription>
            <StyledTitle>PIN</StyledTitle>
            <StyledPIN>{pin}</StyledPIN>
            <StyledTitle>{title}</StyledTitle>
            <StyledDescriptionText>{description}</StyledDescriptionText>
            <StyledTitle>TAGS</StyledTitle>
            <TagsContainer>
              {tags.map((tag, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <StyledTag key={index}>{tag}</StyledTag>
              ))}
            </TagsContainer>
          </BodyDescription>
        </StyledScrollView>
        {studentQuizID && (
          <QuizProgress fill="purple">
            <StyledTitleProgress>Questões repondidas: </StyledTitleProgress>
            <StyledTextProgress>
              {studentChoicesAmount}/{questionAmount}
            </StyledTextProgress>
          </QuizProgress>
        )}
      </DetailsContainer>
      <Dialog
        title="Deseja realmente desistir?"
        visible={visibleGiveUPModal}
        hideDialog={() => setVisibleGivUPModal(false)}
        firstButtonOnPress={() => setVisibleGivUPModal(false)}
        secondButtonOnPress={() => {
          giveUPQuiz();
          setVisibleGivUPModal(false);
        }}
        firstButtonLabel="CANCELAR"
        secondButtonLabel="SIM"
        lottieAnimation={
          <LottieView
            autoPlay
            loop
            style={{ width: 100 }}
            resizeMode="cover"
            speed={1}
            // eslint-disable-next-line global-require
            source={require('@assets/lottie/sad_emote.json')}
          />
        }
      >
        Seu score será calculado parcialmente de acordo com as questões já
        respondidas!
      </Dialog>
    </>
  );
};

export default QuizDescription;

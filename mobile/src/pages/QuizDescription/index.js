/* eslint-disable global-require */
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

// API
import api from '@api';

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
} from './styles';

const QuizDescription = ({ route }) => {
  const { getQuestionsOfQuizFromDatabase } = useQuestions();
  const navigation = useNavigation();

  // eslint-disable-next-line no-unused-vars
  const { idStudentQuiz, questionAmount, studentChoicesAmount, quiz } =
    route.params;
  const { title, description, tags, id, pin } = quiz;

  const [studentQuizID, setStudentQuizID] = useState(idStudentQuiz);

  console.log(studentQuizID, questionAmount, studentChoicesAmount, quiz);

  const startQuizAndGetAllQuestions = async () => {
    const { data } = await api.post('/studentQuiz/startQuiz', { quiz_id: id });

    await getQuestionsOfQuizFromDatabase(id, data.id);
    navigation.navigate('CountDown');
  };

  const continueQuizAndGetAllQuestions = async () => {
    await getQuestionsOfQuizFromDatabase(id, studentQuizID);
    navigation.navigate('CountDown');
  };

  const giveUPQuiz = () => {
    setStudentQuizID(null);
  };

  return (
    <DetailsContainer fill="white">
      <QuizDescriptionHeader>
        <StyledImageBackground source={require('@assets/teste.jpg')}>
          <GoBackButtonWrapper>
            <StyledIconButton onPress={() => navigation.goBack()}>
              <Ionicons name="chevron-back" size={32} color="white" />
            </StyledIconButton>
          </GoBackButtonWrapper>
          {studentQuizID ? (
            <ButtonWrapper>
              <ButtonStyled onPress={giveUPQuiz}>
                <GiveUPButtonWraper>
                  <StyledText fill="white">DESISTIR</StyledText>
                </GiveUPButtonWraper>
              </ButtonStyled>
              <ButtonStyled onPress={continueQuizAndGetAllQuestions}>
                <ResumeButtonWrapper>
                  <StyledIconButton>
                    <Ionicons name="ios-play-circle" size={32} color="white" />
                  </StyledIconButton>
                  <StyledText fill="white">CONTINUAR</StyledText>
                </ResumeButtonWrapper>
              </ButtonStyled>
            </ButtonWrapper>
          ) : (
            <ButtonWrapper>
              <ButtonStyled onPress={startQuizAndGetAllQuestions}>
                <PlayButtonWrapper>
                  <StyledIconButton>
                    <Ionicons name="ios-play-circle" size={32} color="white" />
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
    </DetailsContainer>
  );
};

export default QuizDescription;

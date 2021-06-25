/* eslint-disable global-require */
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import api from '@api';

// COMPONENTS
import Container from '@components/Container';

// ICONS
import { AntDesign, FontAwesome } from '@expo/vector-icons';

// STYLES
import {
  HeaderWrapper,
  HeaderInformations,
  HeaderWelcomeTextView,
  StyledTitle,
  StyledParagraph,
  HeaderButton,
  SearchInput,
  InputWrapper,
  BackgroundHeader,
  QuizCard,
  Description,
  StyledWelcome,
  StyledImage,
  // StyledText,
  QuizTitle,
  StyledIconButton,
  StyledView,
  StyledScrollView,
  QuizContainer,
} from './styles';

const Home = () => {
  const navigation = useNavigation();
  const [allQuizzes, setAllQuizzes] = useState([]);
  const [allQuizzesInProgress, setQuizzesInProgress] = useState([]);
  const [pin, setPin] = useState();

  const getAllPublishedQuizzes = async () => {
    const { data } = await api.get('/publishedQuiz/getAll');
    setAllQuizzes(data);
  };

  const getAllQuizzesInProgress = async () => {
    const { data } = await api.get('/studentQuiz/getQuizInProgress');
    setQuizzesInProgress(data);
  };

  const getQuizByPIN = async () => {
    try {
      const { data } = await api.post('/quiz/getByPIN', { pin });

      navigation.navigate('Descricao', {
        idStudentQuiz: data.id_student_quiz,
        questionAmount: data.questionAmount,
        studentChoicesAmount: data.studentChoicesAmount,
        quiz: {
          id: data.quiz.id,
          title: data.quiz.title,
          description: data.quiz.description,
          pin: data.quiz.pin,
          // image: data.quiz.image_quiz.url,
          tags: data.quiz.tags_quiz.map((tag) => tag.name),
        },
      });
    } catch (err) {
      console.log('error', err.response.data.error);
    }
  };

  useEffect(() => {
    getAllPublishedQuizzes();
    getAllQuizzesInProgress();
  }, []);

  return (
    <Container>
      <HeaderWrapper>
        <BackgroundHeader>
          <HeaderInformations>
            <HeaderButton onPress={() => navigation.openDrawer()}>
              <AntDesign name="menu-fold" size={32} color="white" />
            </HeaderButton>
            <HeaderWelcomeTextView>
              <StyledWelcome fill="white">Seja bem-vindo,</StyledWelcome>
              <StyledParagraph fill="white">
                Escolha um quiz e divirta-se!
              </StyledParagraph>
            </HeaderWelcomeTextView>
          </HeaderInformations>

          <InputWrapper>
            <FontAwesome name="search" size={25} color="#4B24B1" />
            <SearchInput
              defaultValue={pin}
              onSubmitEditing={getQuizByPIN}
              onChangeText={(pinText) => setPin(pinText)}
              placeholder="Digite o PIN"
            />
          </InputWrapper>
        </BackgroundHeader>
      </HeaderWrapper>

      <StyledScrollView>
        <>
          {allQuizzesInProgress.length > 0 && (
            <QuizContainer>
              <QuizTitle>Em Progresso</QuizTitle>
              {allQuizzesInProgress.map((item) => (
                <QuizCard key={item.quiz.id}>
                  <StyledView>
                    <StyledImage source={require('@assets/teste.jpg')} />
                    <Description>
                      <StyledTitle fill="black">{item.quiz.title}</StyledTitle>
                      {/* <StyledText>Criador: {quiz.teacher}</StyledText> */}
                    </Description>
                  </StyledView>

                  <StyledIconButton
                    onPress={() =>
                      navigation.navigate('Descricao', {
                        idStudentQuiz: item.id_student_quiz,
                        questionAmount: item.questionAmount,
                        studentChoicesAmount: item.studentChoicesAmount,
                        quiz: {
                          id: item.quiz.id,
                          title: item.quiz.title,
                          description: item.quiz.description,
                          pin: item.quiz.pin,
                          // image: quiz.image_quiz.url,
                          tags: item.quiz.tags_quiz.map((tag) => tag.name),
                        },
                      })
                    }
                  >
                    <AntDesign name="arrowright" size={24} color="#4B24B1" />
                  </StyledIconButton>
                </QuizCard>
              ))}
            </QuizContainer>
          )}
          {allQuizzes.length > 0 && (
            <QuizContainer>
              <QuizTitle>Quizes</QuizTitle>
              {allQuizzes.map((quiz) => (
                <QuizCard key={quiz.id}>
                  <StyledView>
                    <StyledImage source={require('@assets/teste.jpg')} />
                    <Description>
                      <StyledTitle fill="black">{quiz.title}</StyledTitle>
                      {/* <StyledText>Criador: {quiz.teacher}</StyledText> */}
                    </Description>
                  </StyledView>
                  <StyledIconButton
                    onPress={() =>
                      navigation.navigate('Descricao', {
                        quiz: {
                          id: quiz.id,
                          title: quiz.title,
                          description: quiz.description,
                          pin: quiz.pin,
                          // image: quiz.image_quiz.url,
                          tags: quiz.tags_quiz.map((tag) => tag.name),
                        },
                      })
                    }
                  >
                    <AntDesign name="arrowright" size={24} color="#4B24B1" />
                  </StyledIconButton>
                </QuizCard>
              ))}
            </QuizContainer>
          )}
        </>
      </StyledScrollView>
    </Container>
  );
};

export default Home;

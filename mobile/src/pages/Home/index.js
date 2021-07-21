/* eslint-disable global-require */
import React, { useState, useCallback } from 'react';
import { RefreshControl } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
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
  QuizProgressBar,
  QuizProgressBarBackground,
  QuizProgressText,
} from './styles';

const Home = () => {
  const navigation = useNavigation();
  const [isRefreshing, setRefreshing] = useState(false);
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

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await getAllPublishedQuizzes();
    await getAllQuizzesInProgress();
    setRefreshing(false);
  });

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
      console.log(err);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getAllPublishedQuizzes();
      getAllQuizzesInProgress();
    }, [])
  );

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

      <StyledScrollView
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }
      >
        <>
          {/* <MathJaxSvg fontSize={18} color="#000000" fontCache>
            {`<p  style="font-family: PoppinsBold;">teste</p>`}
          </MathJaxSvg> */}
          {allQuizzesInProgress.length > 0 && (
            <QuizContainer>
              <QuizTitle>Em Progresso</QuizTitle>
              {allQuizzesInProgress.map((item) => (
                <QuizCard
                  key={item.quiz.id}
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
                        image: item.quiz.image_base64,
                        tags: item.quiz.tags_quiz.map((tag) => tag.name),
                      },
                    })
                  }
                >
                  <StyledImage
                    source={{
                      uri: item.quiz.image_base64,
                    }}
                  />
                  <StyledView>
                    <Description>
                      <StyledTitle fill="black">{item.quiz.title}</StyledTitle>
                      {/* <StyledText>Criador: {quiz.teacher}</StyledText> */}
                    </Description>
                    <QuizProgressBarBackground fill="lightGrey">
                      <QuizProgressBar
                        porcentage={
                          (item.studentChoicesAmount * 100) /
                          item.questionAmount
                        }
                        fill="purple"
                      />
                    </QuizProgressBarBackground>
                  </StyledView>
                  <QuizProgressText fill="purple">
                    {Math.floor(
                      (item.studentChoicesAmount * 100) / item.questionAmount
                    )}
                    %
                  </QuizProgressText>
                  <StyledIconButton>
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
                <QuizCard
                  key={quiz.id}
                  onPress={() =>
                    navigation.navigate('Descricao', {
                      quiz: {
                        id: quiz.id,
                        title: quiz.title,
                        description: quiz.description,
                        pin: quiz.pin,
                        image: quiz.image_base64,
                        tags: quiz.tags_quiz.map((tag) => tag.name),
                      },
                    })
                  }
                >
                  <StyledImage
                    source={{
                      uri: quiz.image_base64,
                    }}
                  />
                  <StyledView>
                    <Description>
                      <StyledTitle fill="black">{quiz.title}</StyledTitle>
                      {/* <StyledText>Criador: {quiz.teacher}</StyledText> */}
                    </Description>
                  </StyledView>
                  <StyledIconButton>
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

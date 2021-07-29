/* eslint-disable global-require */
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import api from '@api';

// COMPONENTS
import Container from '@components/Container';

// ICONS
import { AntDesign } from '@expo/vector-icons';

// STYLES
import {
  QuizTitle,
  HeaderButton,
  BackgroundHeader,
  QuizCard,
  Description,
  StyledImage,
  HeaderTitle,
  StyledIconButton,
  StyledView,
  StyledScrollView,
  QuizContainer,
} from './styles';

const Home = () => {
  const navigation = useNavigation();
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await api.get('/studentQuiz/getAllFinishedQuizzes');
        setQuizzes(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <Container>
      <StyledScrollView>
        <BackgroundHeader>
          <HeaderButton onPress={() => navigation.openDrawer()}>
            <AntDesign name="menu-fold" size={32} color="white" />
          </HeaderButton>
          <HeaderTitle>Quizzes Respondidos</HeaderTitle>
        </BackgroundHeader>
        {quizzes.map((quiz) => (
          <QuizContainer key={quiz.id}>
            <QuizCard
              onPress={() =>
                navigation.navigate('AttempsOfQuiz', {
                  attempts: quiz.quiz_student,
                  teacher: quiz.teacher,
                })
              }
            >
              <StyledImage
                source={
                  quiz.image_base64.length ? { uri: quiz.image_base64 } : null
                }
              />
              <StyledView>
                <Description>
                  <QuizTitle fill="black">{quiz.title}</QuizTitle>
                  <QuizTitle fill="black">Prof.: {quiz.teacher.name}</QuizTitle>
                </Description>
              </StyledView>

              <StyledIconButton>
                <AntDesign name="arrowright" size={24} color="#4B24B1" />
              </StyledIconButton>
            </QuizCard>
          </QuizContainer>
        ))}
      </StyledScrollView>
    </Container>
  );
};
export default Home;

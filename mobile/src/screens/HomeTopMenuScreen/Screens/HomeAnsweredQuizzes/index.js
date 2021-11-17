/* eslint-disable global-require */
import React, { useEffect, useState, useCallback } from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import api from '@api';
import { RefreshControl } from 'react-native';

// COMPONENTS
import Container from '@components/Container';

// ICONS
import { AntDesign } from '@expo/vector-icons';

// THEME
import theme from '@theme';
import SeeMoreButton from '../../components/SeeMoreButton';

// STYLES
import {
  QuizTitle,
  QuizCard,
  Description,
  StyledImage,
  StyledIconButton,
  StyledView,
  StyledScrollView,
  QuizContainer,
  TeacherName,
} from './styles';

const Home = () => {
  const navigation = useNavigation();
  const [quizzes, setQuizzes] = useState([]);
  const [isRefreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    try {
      const { data } = await api.post('/studentQuiz/getAllFinishedQuizzes', {
        page: 1,
      });

      setQuizzes(data);
    } catch (error) {
      // console.log(error);
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  });

  useFocusEffect(
    useCallback(() => {
      onRefresh();
    }, [])
  );

  useEffect(() => {
    const unsubscribeListenTabPress = navigation.addListener('tabPress', () => {
      onRefresh();
    });

    return unsubscribeListenTabPress;
  }, [navigation]);

  return (
    <Container>
      <StyledScrollView
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }
      >
        {quizzes.length > 0 && (
          <>
            <SeeMoreButton
              onPress={() => {
                navigation.navigate('InfinityScrollQuizzesStack', {
                  screen: 'InfinityScrollAnsweredQuizzes',
                });
              }}
            />
            <QuizContainer>
              {quizzes.map((quiz) => (
                <QuizCard
                  key={quiz.id}
                  onPress={() =>
                    navigation.navigate('AttempsOfQuiz', {
                      id: quiz.id,
                      attempts: quiz.quiz_student,
                      teacher: quiz.teacher,
                      isFavorite: quiz.isFavorite,
                      title: quiz.title,
                      image: quiz.image_base64,
                      amountOfQuestions: quiz.amountOfQuestions,
                      tags: quiz.tags_quiz,
                      noTime: quiz.no_time,
                    })
                  }
                >
                  <StyledImage
                    source={
                      quiz.image_base64.length
                        ? { uri: quiz.image_base64 }
                        : null
                    }
                  />
                  <StyledView>
                    <Description>
                      <QuizTitle fill="black">{quiz.title}</QuizTitle>
                      <TeacherName fill="black">
                        Prof.: {quiz.teacher.name}
                      </TeacherName>
                    </Description>
                  </StyledView>

                  <StyledIconButton>
                    <AntDesign
                      name="arrowright"
                      size={24}
                      color={theme.color.purple}
                    />
                  </StyledIconButton>
                </QuizCard>
              ))}
            </QuizContainer>
          </>
        )}
      </StyledScrollView>
    </Container>
  );
};

export default Home;

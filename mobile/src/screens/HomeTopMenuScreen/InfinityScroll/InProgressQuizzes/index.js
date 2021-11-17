/* eslint-disable global-require */
import React, { useState, useEffect } from 'react';
import { FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import api from '@api';

// COMPONENTS
import Container from '@components/Container';
import GoBackHeader from '@components/GoBackHeader';

// ICONS
import { AntDesign } from '@expo/vector-icons';

// THEME
import theme from '@theme';

// STYLES
import {
  StyledTitle,
  QuizCard,
  Description,
  StyledImage,
  StyledIconButton,
  StyledView,
  QuizProgressBarBackground,
  QuizProgressBar,
  QuizProgressText,
} from '../../Screens/HomeQuizInProgress/styles';

const QuizzesInfinityScroll = () => {
  const navigation = useNavigation();
  const [page, setPage] = useState(1);
  const [isRefreshing, setRefreshing] = useState(false);
  const [allQuizzes, setAllQuizzes] = useState([]);

  const getAllFavoriteQuizzes = async () => {
    try {
      if (isRefreshing) return;
      setRefreshing(true);

      const { data } = await api.post('/studentQuiz/getQuizInProgress', {
        page,
        limit: 7,
      });

      setAllQuizzes((prevState) => [...prevState, ...data]);

      if (data.length > 0) {
        setPage((prevPage) => prevPage + 1);
      }
    } catch (error) {
      // console.error(error);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    const fetch = async () => {
      await getAllFavoriteQuizzes();
    };

    fetch();
  }, []);

  return (
    <Container>
      <GoBackHeader />
      <FlatList
        data={allQuizzes}
        keyExtractor={(item) => item.quiz.id.toString()}
        refreshing={isRefreshing}
        onRefresh={getAllFavoriteQuizzes}
        onEndReached={getAllFavoriteQuizzes}
        onEndReachedThreshold={0.1}
        renderItem={({ item }) => (
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
                  isFavorite: item.quiz.isFavorite,
                  noTime: item.quiz.no_time,
                },
              })
            }
          >
            <StyledImage
              source={
                item.quiz.image_base64.length
                  ? {
                      uri: item.quiz.image_base64,
                    }
                  : null
              }
            />
            <StyledView>
              <Description>
                <StyledTitle fill="black">{item.quiz.title}</StyledTitle>
              </Description>
              <QuizProgressBarBackground fill="lightGrey">
                <QuizProgressBar
                  porcentage={
                    (item.studentChoicesAmount * 100) / item.questionAmount
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
              <AntDesign
                name="arrowright"
                size={24}
                color={theme.color.purple}
              />
            </StyledIconButton>
          </QuizCard>
        )}
      />
    </Container>
  );
};

export default QuizzesInfinityScroll;

/* eslint-disable global-require */
import React, { useState, useCallback } from 'react';
import { FlatList } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

import api from '@api';

// COMPONENTS
import Container from '@components/Container';
import GoBackHeader from '@components/GoBackHeader';
import theme from '@theme';
import CardQuizAnswered from '@components/Card/WithTeacherName';

const QuizzesInfinityScroll = () => {
  const navigation = useNavigation();
  const [page, setPage] = useState(1);
  const [isRefreshing, setRefreshing] = useState(false);
  const [allQuizzes, setAllQuizzes] = useState([]);
  const [shouldReset, setShouldReset] = useState(false);

  const getAllPublishedQuizzes = async () => {
    try {
      if (isRefreshing) return;
      setRefreshing(true);

      const { data } = await api.post('/studentQuiz/getAllFinishedQuizzes', {
        page,
        limit: 15,
      });

      if (allQuizzes.length > 0)
        setAllQuizzes((prevState) => [...prevState, ...data]);
      else setAllQuizzes(data);

      if (data.length > 0) {
        setPage((prevPage) => prevPage + 1);
      }
    } catch (error) {
      // console.error(error);
    } finally {
      setRefreshing(false);
    }
  };

  const resetPagination = () => {
    setAllQuizzes([]);
    setPage(1);
    setShouldReset((prevState) => !prevState);
  };

  useFocusEffect(
    useCallback(() => {
      getAllPublishedQuizzes();

      return () => {
        setPage(1);
        setRefreshing(false);
        setAllQuizzes([]);
      };
    }, [shouldReset])
  );

  const handleRefresh = () => {
    resetPagination();
  };

  return (
    <Container>
      <GoBackHeader />
      <FlatList
        data={allQuizzes}
        keyExtractor={(item) => item.id.toString()}
        refreshing={isRefreshing}
        onRefresh={handleRefresh}
        onEndReached={getAllPublishedQuizzes}
        onEndReachedThreshold={0.3}
        renderItem={({ item: quiz }) => (
          <CardQuizAnswered
            key={quiz.id}
            data={quiz}
            navigate={() =>
              navigation.navigate('AttempsOfQuiz', {
                id: quiz.id,
                attempts: quiz.quizStudent,
                teacher: quiz.teacher,
                isFavorite: quiz.isFavorite,
                title: quiz.title,
                image: quiz?.image?.url,
                amountOfQuestions: quiz.amountOfQuestions,
                tags: quiz.tagsQuiz,
                noTime: quiz.noTime,
                description: quiz.description,
                pin: quiz.pin,
              })
            }
            color={theme.color.purple}
          />
        )}
      />
    </Container>
  );
};

export default QuizzesInfinityScroll;

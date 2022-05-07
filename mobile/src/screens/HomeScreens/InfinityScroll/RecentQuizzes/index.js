/* eslint-disable global-require */
import React, { useState, useCallback } from 'react';
import { FlatList } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import api from '@api';

// COMPONENTS
import Container from '@components/Container';
import GoBackHeader from '@components/GoBackHeader';
import theme from '@theme';
import CardQuizBasic from '@components/Card/Basic';

const QuizzesInfinityScroll = () => {
  const navigation = useNavigation();
  const [page, setPage] = useState(1);
  const [isRefreshing, setRefreshing] = useState(false);
  const [allQuizzes, setAllQuizzes] = useState([]);
  const [shouldReset, setShouldReset] = useState(false);

  const getAllRecentQuizzes = async () => {
    try {
      if (isRefreshing) return;
      setRefreshing(true);

      const { data } = await api.post('/studentQuiz/getRecentQuiz', {
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
      getAllRecentQuizzes();

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
        onEndReached={getAllRecentQuizzes}
        onEndReachedThreshold={0.3}
        renderItem={({ item: quiz }) => (
          <CardQuizBasic
            key={quiz.id}
            data={quiz}
            color={theme.color.purple}
            navigate={() =>
              navigation.navigate('Descricao', {
                quiz: {
                  id: quiz.id,
                  title: quiz.title,
                  description: quiz.description,
                  pin: quiz.pin,
                  image: quiz?.image?.url,
                  tags: quiz.tagsQuiz.map((tag) => tag.name),
                  isFavorite: quiz.isFavorite,
                  noTime: quiz.noTime,
                },
              })
            }
          />
        )}
      />
    </Container>
  );
};

export default QuizzesInfinityScroll;

/* eslint-disable global-require */
import React, { useState, useEffect } from 'react';
import { FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import api from '@api';

// COMPONENTS
import Container from '@components/Container';
import GoBackHeader from '@components/GoBackHeader';

import theme from '@theme';
import CardQuizInProgress from '@components/Card/InProgress';

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
          <CardQuizInProgress
            key={item.quiz.id}
            data={item}
            color={theme.color.purple}
            navigate={() =>
              navigation.navigate('Descricao', {
                idStudentQuiz: item.idStudentQuiz,
                questionAmount: item.questionAmount,
                studentChoicesAmount: item.studentChoicesAmount,
                quiz: {
                  id: item.quiz.id,
                  title: item.quiz.title,
                  description: item.quiz.description,
                  pin: item.quiz.pin,
                  image: item.quiz?.image?.url,
                  tags: item.quiz.tagsQuiz.map((tag) => tag.name),
                  isFavorite: item.quiz.isFavorite,
                  noTime: item.quiz.noTime,
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

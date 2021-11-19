/* eslint-disable global-require */
import React, { useState, useEffect } from 'react';
import { FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import api from '@api';

// COMPONENTS
import Container from '@components/Container';
import GoBackHeader from '@components/GoBackHeader';

import theme from '@theme';
import CardQuizBasic from '../../components/CardQuizzes/Basic';

const QuizzesInfinityScroll = () => {
  const navigation = useNavigation();
  const [page, setPage] = useState(1);
  const [isRefreshing, setRefreshing] = useState(false);
  const [allQuizzes, setAllQuizzes] = useState([]);

  const getAllFavoriteQuizzes = async () => {
    try {
      if (isRefreshing) return;
      setRefreshing(true);

      const { data } = await api.post('/studentQuiz/favorites', {
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
        keyExtractor={(item) => item.id.toString()}
        refreshing={isRefreshing}
        onRefresh={getAllFavoriteQuizzes}
        onEndReached={getAllFavoriteQuizzes}
        onEndReachedThreshold={0.1}
        renderItem={({ item: quiz }) => (
          <CardQuizBasic
            key={quiz.id}
            quiz={quiz}
            color={theme.color.purple}
            navigate={() =>
              navigation.navigate('Descricao', {
                quiz: {
                  id: quiz.id,
                  title: quiz.title,
                  description: quiz.description,
                  pin: quiz.pin,
                  image: quiz.image_base64,
                  tags: quiz.tags_quiz.map((tag) => tag.name),
                  isFavorite: quiz.isFavorite,
                  noTime: quiz.no_time,
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

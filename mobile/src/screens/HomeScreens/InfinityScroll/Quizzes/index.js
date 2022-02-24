/* eslint-disable global-require */
import React, { useState, useEffect } from 'react';
import { FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
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

  const getAllPublishedQuizzes = async () => {
    try {
      if (isRefreshing) return;
      setRefreshing(true);

      const { data } = await api.post('/publishedQuiz/getAll', {
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
      await getAllPublishedQuizzes();
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
        onRefresh={getAllPublishedQuizzes}
        onEndReached={getAllPublishedQuizzes}
        onEndReachedThreshold={0.1}
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

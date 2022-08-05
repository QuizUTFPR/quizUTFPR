/* eslint-disable global-require */
import React, { useState, useCallback } from 'react';
import { FlatList } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
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
  const [shouldReset, setShouldReset] = useState(false);

  const getAllQuizInProgress = async () => {
    try {
      if (isRefreshing) return;
      setRefreshing(true);

      const { data } = await api.post('/studentGameInfo/getQuizInProgress', {
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
      getAllQuizInProgress();

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
        keyExtractor={(item) =>
          item?.classInstance
            ? `${item?.classInstance.id + item.quiz.id}`
            : item.quiz.id.toString()
        }
        refreshing={isRefreshing}
        onRefresh={handleRefresh}
        onEndReached={getAllQuizInProgress}
        onEndReachedThreshold={0.3}
        renderItem={({ item }) => (
          <CardQuizInProgress
            data={item}
            color={theme.color.primary}
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
                classInstance: item?.classInstance,
              })
            }
          />
        )}
      />
    </Container>
  );
};

export default QuizzesInfinityScroll;

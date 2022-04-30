/* eslint-disable global-require */
import React, { useState, useCallback, useEffect } from 'react';
import { RefreshControl } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import api from '@api';

// COMPONENTS
import Container from '@components/Container';
import NoContent from '@components/NoContent';

// THEME
import theme from '@theme';
import CardQuizInProgress from '@components/Card/InProgress';
import CardQuizBasic from '@components/Card/Basic';
import SeeMoreButton from '../../components/SeeMoreButton';

// STYLES
import { StyledScrollView, QuizContainer } from '../../style';

const FavoriteQuizzes = () => {
  const navigation = useNavigation();
  const [isRefreshing, setRefreshing] = useState(false);
  const [allQuizzes, setAllQuizzes] = useState([]);

  const getAllFavoriteQuizzes = async () => {
    try {
      const { data } = await api.post('/studentQuiz/favorites', {
        page: 1,
      });

      setAllQuizzes(data);
    } catch (error) {
      console.error({ ...error });
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await getAllFavoriteQuizzes();
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
      {!isRefreshing && allQuizzes.length === 0 && (
        <NoContent title="Opps..." subtitle="Você favoritou nenhum quiz." />
      )}
      <StyledScrollView
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }
      >
        {allQuizzes.length > 0 && (
          <>
            <SeeMoreButton
              onPress={() => {
                navigation.navigate('InfinityScrollQuizzesStack', {
                  screen: 'InfinityScrollFavoriteQuizzes',
                });
              }}
            />
            <QuizContainer>
              {/* <QuizTitle>Quizes</QuizTitle> */}
              {allQuizzes.map((item) => {
                const key = item?.classInstance
                  ? item?.classInstance.id + item.quiz.id
                  : item.quiz.id;

                return item?.isInProgress ? (
                  <CardQuizInProgress
                    key={key}
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
                        classInstance: item?.classInstance,
                      })
                    }
                  />
                ) : (
                  <CardQuizBasic
                    key={key}
                    data={item.quiz}
                    color={theme.color.purple}
                    navigate={() =>
                      navigation.navigate('Descricao', {
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
                );
              })}
            </QuizContainer>
          </>
        )}
      </StyledScrollView>
    </Container>
  );
};

export default FavoriteQuizzes;

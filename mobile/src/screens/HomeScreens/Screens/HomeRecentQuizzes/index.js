/* eslint-disable global-require */
import React, { useState, useCallback, useEffect } from 'react';
import { RefreshControl } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import api from '@api';

// COMPONENTS
import Container from '@components/Container';
import NoContent from '@components/NoContent';

// ICONS
import theme from '@theme';
import CardQuizBasic from '@components/Card/Basic';
import SeeMoreButton from '../../components/SeeMoreButton';

// STYLES
import { StyledScrollView, QuizContainer } from '../../style';

const HomeRecentQuizzes = () => {
  const navigation = useNavigation();
  const [isRefreshing, setRefreshing] = useState(false);
  const [allQuizzes, setAllQuizzes] = useState([]);

  const getAllRecentPublishedQuiz = async () => {
    try {
      const { data } = await api.post('/studentQuiz/getRecentQuiz', {
        page: 1,
      });

      setAllQuizzes(data);
    } catch (error) {
      console.error(error);
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await getAllRecentPublishedQuiz();
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
        <NoContent title="Opps..." subtitle="Nenhum quiz encontrado." />
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
                  screen: 'InfinityScrollRecentQuizzes',
                });
              }}
            />
            <QuizContainer>
              {/* <QuizTitle>Novos Quizzes</QuizTitle> */}
              {allQuizzes.map((quiz) => (
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
              ))}
            </QuizContainer>
          </>
        )}
      </StyledScrollView>
    </Container>
  );
};

export default HomeRecentQuizzes;

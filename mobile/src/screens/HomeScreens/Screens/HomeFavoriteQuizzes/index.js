/* eslint-disable global-require */
import React, { useState, useCallback, useEffect } from 'react';
import { RefreshControl } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import api from '@api';

// COMPONENTS
import Container from '@components/Container';

// THEME
import theme from '@theme';
import CardQuizBasic from '../../components/CardQuizzes/Basic';
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
      // console.error(error);
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
              {allQuizzes.map((quiz) => (
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
              ))}
            </QuizContainer>
          </>
        )}
      </StyledScrollView>
    </Container>
  );
};

export default FavoriteQuizzes;
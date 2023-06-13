import React, { useState, useCallback, useEffect } from 'react';
import { RefreshControl } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import api from '@api';
// import { useSpring, animated } from '@react-spring/native';

// COMPONENTS
import Container from '@components/Container';
import theme from '@theme';
import CardQuizBasic from '@components/Card/Basic';
import NoContent from '@components/NoContent';

// THEME
import SeeMoreButton from '../../components/SeeMoreButton';

// STYLES
import { StyledScrollView, QuizContainer } from '../../style';

const HomeQuizzes = () => {
  const navigation = useNavigation();
  const [isRefreshing, setRefreshing] = useState(false);
  const [allQuizzes, setAllQuizzes] = useState([]);

  const getAllPublishedQuizzes = async () => {
    try {
      const { data } = await api.post('/studentPublishedQuiz/getAll', {
        page: 1,
      });
      setAllQuizzes(data);
    } catch (error) {
      // console.error(error);
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await getAllPublishedQuizzes();
    setRefreshing(false);
  }, []);

  useFocusEffect(
    useCallback(() => {
      onRefresh();
    }, [onRefresh])
  );

  useEffect(() => {
    const unsubscribeListenTabPress = navigation.addListener('tabPress', () => {
      onRefresh();
    });

    return unsubscribeListenTabPress;
  }, [navigation, onRefresh]);

  return (
    <Container>
      {!isRefreshing && allQuizzes.length === 0 ? (
        <NoContent title="Opps..." subtitle="Nenhum quiz encontrado." />
      ) : null}
      <StyledScrollView
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }
      >
        {/* <animated.View style={move}>
          <Text onPress={() => toggleMoveMe(!moveMe)}>teste</Text>
        </animated.View> */}
        {allQuizzes.length > 0 ? (
          <>
            <SeeMoreButton
              onPress={() => {
                navigation.navigate('InfinityScrollQuizzesStack', {
                  screen: 'InfinityScrollHomeQuizzes',
                });
              }}
            />

            <QuizContainer>
              {/* <QuizTitle>Quizes</QuizTitle> */}
              {allQuizzes.map((quiz) => (
                <CardQuizBasic
                  key={quiz.id}
                  data={quiz}
                  color={theme.color.primary}
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
        ) : null}
      </StyledScrollView>
    </Container>
  );
};

export default HomeQuizzes;

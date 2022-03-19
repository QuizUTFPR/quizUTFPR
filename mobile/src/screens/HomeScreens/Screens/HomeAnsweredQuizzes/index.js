import React, { useEffect, useState, useCallback } from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import api from '@api';
import { RefreshControl } from 'react-native';

// COMPONENTS
import Container from '@components/Container';

// THEME
import theme from '@theme';
import CardQuizAnswered from '@components/Card/WithTeacherName';
import SeeMoreButton from '../../components/SeeMoreButton';

// STYLES
import { StyledScrollView, QuizContainer } from '../../style';

const Home = () => {
  const navigation = useNavigation();
  const [quizzes, setQuizzes] = useState([]);
  const [isRefreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    try {
      const { data } = await api.post('/studentQuiz/getAllFinishedQuizzes', {
        page: 1,
      });

      setQuizzes(data);
    } catch (error) {
      // console.log(error);
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchData();
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
        {quizzes.length > 0 && (
          <>
            <SeeMoreButton
              onPress={() => {
                navigation.navigate('InfinityScrollQuizzesStack', {
                  screen: 'InfinityScrollAnsweredQuizzes',
                });
              }}
            />
            <QuizContainer>
              {quizzes.map((quiz) => (
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
              ))}
            </QuizContainer>
          </>
        )}
      </StyledScrollView>
    </Container>
  );
};

export default Home;

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
import SeeMoreButton from '../../components/SeeMoreButton';

// STYLES
import { StyledScrollView, QuizContainer } from '../../style';

const HomeQuizInProgress = () => {
  const navigation = useNavigation();
  const [isRefreshing, setRefreshing] = useState(false);
  const [allQuizzesInProgress, setQuizzesInProgress] = useState([]);

  const getAllQuizzesInProgress = async () => {
    try {
      const { data } = await api.post('/studentQuiz/getQuizInProgress', {
        page: 1,
      });
      setQuizzesInProgress(data);
    } catch (error) {
      // console.log(error);
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await getAllQuizzesInProgress();
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
      {!isRefreshing && allQuizzesInProgress.length === 0 && (
        <NoContent
          title="Opps..."
          subtitle="Você não possui nenhum quiz em andamento."
        />
      )}
      <StyledScrollView
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }
      >
        {allQuizzesInProgress.length > 0 && (
          <>
            <SeeMoreButton
              onPress={() => {
                navigation.navigate('InfinityScrollQuizzesStack', {
                  screen: 'InfinityScrollInProgressQuizzes',
                });
              }}
            />
            <QuizContainer>
              {allQuizzesInProgress.map((item) => (
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
              ))}
            </QuizContainer>
          </>
        )}
      </StyledScrollView>
    </Container>
  );
};

export default HomeQuizInProgress;

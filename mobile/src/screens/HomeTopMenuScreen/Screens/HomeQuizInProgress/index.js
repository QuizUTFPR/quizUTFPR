/* eslint-disable global-require */
import React, { useState, useCallback, useEffect } from 'react';
import { RefreshControl } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import api from '@api';

// COMPONENTS
import Container from '@components/Container';

// ICONS
import { AntDesign } from '@expo/vector-icons';

// THEME
import theme from '@theme';

// STYLES
import {
  StyledTitle,
  QuizCard,
  Description,
  StyledImage,
  // QuizTitle,
  StyledIconButton,
  StyledView,
  StyledScrollView,
  QuizContainer,
  QuizProgressBar,
  QuizProgressBarBackground,
  QuizProgressText,
} from './styles';

const HomeQuizInProgress = () => {
  const navigation = useNavigation();
  const [isRefreshing, setRefreshing] = useState(false);
  const [allQuizzesInProgress, setQuizzesInProgress] = useState([]);

  const getAllQuizzesInProgress = async () => {
    try {
      const { data } = await api.get('/studentQuiz/getQuizInProgress');
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
      <StyledScrollView
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }
      >
        <>
          {allQuizzesInProgress.length > 0 && (
            <QuizContainer>
              {/* <QuizTitle>Em Progresso</QuizTitle> */}
              {allQuizzesInProgress.map((item) => (
                <QuizCard
                  key={item.quiz.id}
                  onPress={() =>
                    navigation.navigate('Descricao', {
                      idStudentQuiz: item.id_student_quiz,
                      questionAmount: item.questionAmount,
                      studentChoicesAmount: item.studentChoicesAmount,
                      quiz: {
                        id: item.quiz.id,
                        title: item.quiz.title,
                        description: item.quiz.description,
                        pin: item.quiz.pin,
                        image: item.quiz.image_base64,
                        tags: item.quiz.tags_quiz.map((tag) => tag.name),
                        isFavorite: item.quiz.isFavorite,
                        noTime: item.quiz.no_time,
                      },
                    })
                  }
                >
                  <StyledImage
                    source={
                      item.quiz.image_base64.length
                        ? {
                            uri: item.quiz.image_base64,
                          }
                        : null
                    }
                  />
                  <StyledView>
                    <Description>
                      <StyledTitle fill="black">{item.quiz.title}</StyledTitle>
                    </Description>
                    <QuizProgressBarBackground fill="lightGrey">
                      <QuizProgressBar
                        porcentage={
                          (item.studentChoicesAmount * 100) /
                          item.questionAmount
                        }
                        fill="purple"
                      />
                    </QuizProgressBarBackground>
                  </StyledView>
                  <QuizProgressText fill="purple">
                    {Math.floor(
                      (item.studentChoicesAmount * 100) / item.questionAmount
                    )}
                    %
                  </QuizProgressText>
                  <StyledIconButton>
                    <AntDesign
                      name="arrowright"
                      size={24}
                      color={theme.color.purple}
                    />
                  </StyledIconButton>
                </QuizCard>
              ))}
            </QuizContainer>
          )}
        </>
      </StyledScrollView>
    </Container>
  );
};

export default HomeQuizInProgress;

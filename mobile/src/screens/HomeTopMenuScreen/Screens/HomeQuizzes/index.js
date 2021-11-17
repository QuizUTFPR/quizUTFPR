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
import SeeMoreButton from '../../components/SeeMoreButton';

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
} from './styles';

const HomeQuizzes = () => {
  const navigation = useNavigation();
  const [isRefreshing, setRefreshing] = useState(false);
  const [allQuizzes, setAllQuizzes] = useState([]);

  const getAllPublishedQuizzes = async () => {
    try {
      console.log('teste');
      const { data } = await api.post('/publishedQuiz/getAll', {
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

  console.log(allQuizzes);
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
                  screen: 'InfinityScrollHomeQuizzes',
                });
              }}
            />

            <QuizContainer>
              {/* <QuizTitle>Quizes</QuizTitle> */}
              {allQuizzes.map((quiz) => (
                <QuizCard
                  key={quiz.id}
                  onPress={() =>
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
                >
                  <StyledImage
                    source={
                      quiz.image_base64.length
                        ? {
                            uri: quiz.image_base64,
                          }
                        : null
                    }
                  />
                  <StyledView>
                    <Description>
                      <StyledTitle fill="black">{quiz.title}</StyledTitle>
                    </Description>
                  </StyledView>
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
          </>
        )}
      </StyledScrollView>
    </Container>
  );
};

export default HomeQuizzes;

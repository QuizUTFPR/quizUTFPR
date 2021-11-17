/* eslint-disable global-require */
import React, { useState, useEffect } from 'react';
import { FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import api from '@api';

// COMPONENTS
import Container from '@components/Container';
import GoBackHeader from '@components/GoBackHeader';

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
  StyledIconButton,
  StyledView,
} from '../../Screens/HomeQuizzes/styles';

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
        renderItem={({ item }) => (
          <QuizCard
            key={item.id}
            onPress={() =>
              navigation.navigate('Descricao', {
                quiz: {
                  id: item.id,
                  title: item.title,
                  description: item.description,
                  pin: item.pin,
                  image: item.image_base64,
                  tags: item.tags_quiz.map((tag) => tag.name),
                  isFavorite: item.isFavorite,
                  noTime: item.no_time,
                },
              })
            }
          >
            <StyledImage
              source={
                item.image_base64.length
                  ? {
                      uri: item.image_base64,
                    }
                  : null
              }
            />
            <StyledView>
              <Description>
                <StyledTitle fill="black">{item.title}</StyledTitle>
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
        )}
      />
    </Container>
  );
};

export default QuizzesInfinityScroll;

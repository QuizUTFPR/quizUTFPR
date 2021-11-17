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
  QuizTitle,
  TeacherName,
  QuizCard,
  Description,
  StyledImage,
  StyledIconButton,
  StyledView,
} from '../../Screens/HomeAnsweredQuizzes/styles';

const QuizzesInfinityScroll = () => {
  const navigation = useNavigation();
  const [page, setPage] = useState(1);
  const [isRefreshing, setRefreshing] = useState(false);
  const [allQuizzes, setAllQuizzes] = useState([]);

  const getAllPublishedQuizzes = async () => {
    try {
      if (isRefreshing) return;
      setRefreshing(true);

      const { data } = await api.post('/studentQuiz/getAllFinishedQuizzes', {
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
              navigation.navigate('AttempsOfQuiz', {
                id: item.id,
                attempts: item.quiz_student,
                teacher: item.teacher,
                isFavorite: item.isFavorite,
                title: item.title,
                image: item.image_base64,
                amountOfQuestions: item.amountOfQuestions,
                tags: item.tags_quiz,
                noTime: item.no_time,
              })
            }
          >
            <StyledImage
              source={
                item.image_base64.length ? { uri: item.image_base64 } : null
              }
            />
            <StyledView>
              <Description>
                <QuizTitle fill="black">{item.title}</QuizTitle>
                <TeacherName fill="black">
                  Prof.: {item.teacher.name}
                </TeacherName>
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

import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import api from '@api';
import useClass from '@hook/useClass';

// THEME
import theme from '@theme';

// COMPONENTS
import CardQuizBasic from '@components/Card/Basic';

// STYLES
import {
  ClassContainer,
  StyledScrollView,
  Title,
  QuizContainer,
} from './style';

const QuizzesOfClass = () => {
  const navigation = useNavigation();
  const [classQuizzes, setClassQuizzes] = useState([]);
  const { classData } = useClass();

  const getClassQuizzes = async () => {
    try {
      const { data } = await api.get(
        `/class/getAllClassQuizzes/${classData.id}`
      );

      setClassQuizzes(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getClassQuizzes();
  }, []);

  return (
    <ClassContainer fill="white">
      <StyledScrollView>
        <Title>Quizzes da Turma</Title>

        <QuizContainer>
          {/* <QuizTitle>Quizes</QuizTitle> */}
          {classQuizzes.map((quiz) => (
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
      </StyledScrollView>
    </ClassContainer>
  );
};

export default QuizzesOfClass;

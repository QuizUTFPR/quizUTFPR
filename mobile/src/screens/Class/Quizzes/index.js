import React, { useState, useCallback } from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Text } from 'react-native';
import api from '@api';
import useClass from '@hook/useClass';
import NoContent from '@components/NoContent';

// THEME
import theme from '@theme';

// STYLES
import {
  ClassContainer,
  StyledScrollView,
  Title,
  QuizContainer,
  StyledCardQuizBasic,
} from './style';

const QuizzesOfClass = () => {
  const navigation = useNavigation();
  const [classQuizzes, setClassQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  const { classData } = useClass();

  const getClassQuizzes = async () => {
    try {
      setLoading(true);

      const { data } = await api.get(
        `/studentClass/getAllClassQuizzes/${classData.id}`
      );

      setClassQuizzes(data);
    } catch (error) {
      console.log('quizzes class', { ...error });
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getClassQuizzes();

      return () => {
        setLoading(true);
      };
    }, [])
  );

  return (
    <ClassContainer fill="white">
      {!loading && classQuizzes.length === 0 ? (
        <NoContent
          title="Opps..."
          subtitle="A turma não possui nenhum quiz vinculado."
        />
      ) : null}
      <StyledScrollView>
        {!loading ? <Title>Quizzes da Turma</Title> : null}

        <QuizContainer>
          {classQuizzes.length <= 0 && !loading ? (
            <Text>Nenhum quiz cadastrado...</Text>
          ) : null}
          {classQuizzes.map((quiz) => (
            <StyledCardQuizBasic
              key={quiz.id}
              data={quiz}
              color={theme.color.primary}
              navigate={() => {
                navigation.navigate('Descricao', {
                  classId: classData.id,
                  quiz: {
                    id: quiz.id,
                    title: quiz.title,
                    description: quiz.description,
                    pin: quiz.pin,
                    image: quiz?.image?.url,
                    tags: ['UTFPR'],
                    // tags: quiz?.tagsQuiz?.map((tag) => tag.name),
                    isFavorite: quiz.isFavorite,
                    noTime: quiz.noTime,
                  },
                });
              }}
            />
          ))}
        </QuizContainer>
      </StyledScrollView>
    </ClassContainer>
  );
};

export default QuizzesOfClass;

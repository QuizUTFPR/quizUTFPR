import React, { useState } from 'react';
import { useRoute } from '@react-navigation/native';
import api from '@api';

// STYLES
import { ClassContainer, StyledScrollView, Title } from './style';

const QuizzesOfClass = (props) => {
  const [classQuizzes, setClassQuizzes] = useState([]);
  const teste = useRoute();
  console.log(teste);

  // const getClassQuizzes = async () => {
  //   try {
  //     const { data } = await api.get(`/class/getAllClassQuizzes/${idClass}`);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <ClassContainer fill="white">
      <StyledScrollView>
        <Title>Quizzes da Turma</Title>
      </StyledScrollView>
    </ClassContainer>
  );
};

export default QuizzesOfClass;

import React from 'react';
import { AntDesign } from '@expo/vector-icons';

import {
  QuizCard,
  StyledImage,
  StyledView,
  Description,
  QuizTitle,
  StyledIconButton,
} from '../style';

import { TeacherName } from './style';

const CardQuizAnswered = ({ quiz, color, navigate }) => (
  <QuizCard onPress={navigate}>
    <StyledImage source={quiz?.image?.url ? { uri: quiz.image.url } : null} />
    <StyledView>
      <Description>
        <QuizTitle fill="black">{quiz.title}</QuizTitle>
        <TeacherName fill="black">Prof.: {quiz.teacher.name}</TeacherName>
      </Description>
    </StyledView>

    <StyledIconButton>
      <AntDesign name="arrowright" size={24} color={color} />
    </StyledIconButton>
  </QuizCard>
);

export default CardQuizAnswered;

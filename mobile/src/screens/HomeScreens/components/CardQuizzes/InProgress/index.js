import React from 'react';

// Icons
import { AntDesign } from '@expo/vector-icons';

// Style
import {
  QuizCard,
  StyledImage,
  StyledView,
  Description,
  QuizTitle,
  StyledIconButton,
} from '../style';

import {
  QuizProgressBarBackground,
  QuizProgressBar,
  QuizProgressText,
} from './style';

const CardQuizBasic = ({ navigate, quiz, color }) => (
  <QuizCard onPress={navigate}>
    <StyledImage
      source={
        quiz.quiz.image_base64.length
          ? {
              uri: quiz.quiz.image_base64,
            }
          : null
      }
    />
    <StyledView>
      <Description>
        <QuizTitle fill="black">{quiz.quiz.title}</QuizTitle>
      </Description>
      <QuizProgressBarBackground fill="lightGrey">
        <QuizProgressBar
          porcentage={(quiz.studentChoicesAmount * 100) / quiz.questionAmount}
          fill="purple"
        />
      </QuizProgressBarBackground>
    </StyledView>
    <QuizProgressText fill="purple">
      {Math.floor((quiz.studentChoicesAmount * 100) / quiz.questionAmount)}%
    </QuizProgressText>
    <StyledIconButton>
      <AntDesign name="arrowright" size={24} color={color} />
    </StyledIconButton>
  </QuizCard>
);

export default CardQuizBasic;

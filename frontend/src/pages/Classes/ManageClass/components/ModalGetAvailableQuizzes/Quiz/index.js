import React from 'react';
import { useLocation } from 'react-router-dom';

// COMPONENTS
import { CardActionArea } from '@mui/material';

// STYLE
import {
  QuizCard,
  WrapperQuiz,
  CheckBox,
  ImageQuiz,
  QuizTitle,
  QuizInfoWrapper,
  QuizDescription,
  WrapperActions,
  StyledIconButton,
  EmptyImage,
  QuizRightWrapper,
} from './style';

const Quiz = ({ quiz, id, checked, onChange }) => {
  return (
    <QuizCard variant="outlined" checked={Boolean(checked)}>
      <CardActionArea component="label">
        <WrapperQuiz>
          <CheckBox checked={Boolean(checked)} onChange={onChange(id)} />
          {quiz.idImage && <ImageQuiz />}
          {!quiz.idImage && <EmptyImage />}
          <QuizRightWrapper>
            <QuizInfoWrapper>
              <QuizTitle>{quiz.title}</QuizTitle>
              <QuizDescription>{quiz.description}</QuizDescription>
            </QuizInfoWrapper>
          </QuizRightWrapper>
        </WrapperQuiz>
      </CardActionArea>
    </QuizCard>
  );
};

export default Quiz;

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

const Quiz = ({ quiz, id, checked, onChange, onClick }) => {
  return (
    <QuizCard variant="outlined" checked={Boolean(checked)} onClick={onClick}>
      <CardActionArea component="label">
        <WrapperQuiz>
          <CheckBox checked={Boolean(checked)} onChange={onChange(id)} />
          {quiz?.image?.url ? (
            <ImageQuiz src={quiz?.image?.url} />
          ) : (
            <EmptyImage />
          )}
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

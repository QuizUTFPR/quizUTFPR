import React from 'react';

// COMPONENTS
import Tooltip from '@components/ToolTip';
import { Delete } from '@mui/icons-material';

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
    // <QuizCard variant="outlined" checked={Boolean(checked)}>
    <QuizCard variant="outlined" xs={12} checked={Boolean(true)}>
      <WrapperQuiz>
        <CheckBox checked={Boolean(checked)} onChange={onChange(id)} />
        {/* <ImageQuiz /> */}
        <EmptyImage />
        <QuizRightWrapper>
          <QuizInfoWrapper>
            <QuizTitle>{quiz.title}</QuizTitle>
            <QuizDescription>{quiz.description}</QuizDescription>
          </QuizInfoWrapper>
        </QuizRightWrapper>
      </WrapperQuiz>
    </QuizCard>
  );
};

export default Quiz;

import React from 'react';
import { useLocation } from 'react-router-dom';

// Components
import { Divider } from '@mui/material';
import Tooltip from '@components/ToolTip';
import { Delete } from '@mui/icons-material';

// Style
import {
  Wrapper,
  QuizzesWrapper,
  HeaderWrapper,
  StyledButton,
  WrapperQuiz,
  ImageQuiz,
  ContainerContent,
  QuizTitle,
  QuizInfoWrapper,
  QuizDescription,
  WrapperActions,
  StyledIconButton,
  EmptyImage,
  QuizRightWrapper,
} from './style';
import { ClassName } from '../style';

const QuizzesOfClass = () => {
  const { state } = useLocation();

  return (
    <Wrapper
      key="quizzes"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <QuizzesWrapper>
        <HeaderWrapper>
          <ClassName>{state?.title || 'Sem Título'} </ClassName>
          <StyledButton
            variant="contained"
            color="primary"
            // component={Link}
            // to={CREATE_QUIZ}
          >
            Anexar Quiz
          </StyledButton>
        </HeaderWrapper>
        <Divider />

        <ContainerContent>
          <WrapperQuiz>
            {/* <ImageQuiz /> */}
            <EmptyImage />
            <QuizRightWrapper>
              <QuizInfoWrapper>
                <QuizTitle>Título do Quiz</QuizTitle>
                <QuizDescription>Decrição do Quiz</QuizDescription>
              </QuizInfoWrapper>

              <WrapperActions>
                <Tooltip arrow ariaLabel="deletar" title="Deletar">
                  <StyledIconButton>
                    <Delete />
                  </StyledIconButton>
                </Tooltip>
              </WrapperActions>
            </QuizRightWrapper>
          </WrapperQuiz>
        </ContainerContent>
      </QuizzesWrapper>
    </Wrapper>
  );
};

export default QuizzesOfClass;

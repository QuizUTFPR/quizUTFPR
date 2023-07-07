import styled from 'styled-components';
import { motion } from 'framer-motion';
import Button from '@components/Button';
import { IconButton, Typography } from '@mui/material';

export const Wrapper = styled(motion.div)``;

export const QuizzesWrapper = styled.div`
  box-shadow: 1px 1px 8px -3px rgb(54 48 48 / 49%);
  background: white;
  border-radius: 4px;
  padding: 20px;
  border: 1px solid gray;
`;

export const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
`;

export const NoStudentsWarning = styled(Typography)`
  margin-top: 40px;
  font-weight: 400;
  text-align: center;
`;

export const StyledButton = styled(Button)`
  flex-shrink: 0;
`;

export const ContainerContent = styled.div`
  padding: 10px 0;
`;

export const WrapperQuiz = styled.div`
  height: 150px;
  margin-bottom: 20px;
  width: 100%;
  justify-content: space-between;

  border-radius: 4px;
  display: flex;
  align-items: center;

  box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);

  @media (max-width: 768px) {
    flex-direction: column;
    height: 300px;
  }
`;

export const ImageQuiz = styled.img`
  width: 200px;
  height: 100%;
`;

export const EmptyImage = styled.div`
  border-radius: 4px 0 0 4px;
  flex-shrink: 0;
  height: 100%;
  width: 200px;
  background: ${({ theme }) => theme.palette.primary.main};

  @media (max-width: 768px) {
    height: 70%;
    width: 100%;
    border-radius: 8px 8px 0 0px;
  }
`;

export const QuizInfoWrapper = styled.div`
  border-left: 1px solid rgba(0, 0, 0, 0.12);
  height: 100%;
  width: 90%;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
`;

export const QuizRightWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  border-radius: 0 8px 8px 0;
  overflow: hidden;
`;

export const QuizTitle = styled.p`
  font-weight: 700;
  font-size: 1.2rem;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

export const QuizDescription = styled.p`
  font-size: 0.9rem;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

export const WrapperActions = styled.div`
  height: 100%;
  flex-grow: 1;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const StyledIconButton = styled(IconButton)`
  width: fit-content;
`;

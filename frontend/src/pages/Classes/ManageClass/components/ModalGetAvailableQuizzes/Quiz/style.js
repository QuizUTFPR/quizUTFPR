import styled from 'styled-components';

// COMPONENTS
import { Card, IconButton } from '@mui/material';

export const QuizCard = styled(Card)`
  width: 100%;
  border-radius: 8px;
  margin-bottom: 20px;
  border: 1px solid
    ${({ checked, theme }) =>
      checked ? theme.palette.primary.main : 'rgba(0, 0, 0, 0.12)'};
  &&:last-child {
    margin-bottom: 0px;
  }
`;

export const WrapperQuiz = styled.div`
  height: 120px;
  width: 100%;
  border-radius: 8px;
  display: flex;
  align-items: center;
  @media (max-width: 768px) {
    flex-direction: column;
    height: 300px;
  }
`;

export const CheckBox = styled.input.attrs({
  type: 'checkbox',
})`
  display: none;
`;

export const ImageQuiz = styled.img`
  width: 220px;
  border-radius: 8px 0 0 8px;
`;

export const EmptyImage = styled.div`
  height: 100%;
  width: 220px;

  border-radius: 8px 0 0 8px;
  background: ${({ theme }) => theme.palette.primary.main};
  @media (max-width: 768px) {
    width: 100%;
    height: 50%;
    border-radius: 8px 8px 0 0px;
  }
`;

export const QuizInfoWrapper = styled.div`
  border-left: 1px solid rgba(0, 0, 0, 0.12);
  height: 100%;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  width: 100%;

  @media (max-width: 768px) {
    width: 90%;
    border-left: none;
  }
`;

export const QuizRightWrapper = styled.div`
  flex: 1;
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
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-left: 1px solid rgba(0, 0, 0, 0.12);
  @media (max-width: 768px) {
    width: 20%;
  }
`;

export const StyledIconButton = styled(IconButton)`
  width: fit-content;
`;

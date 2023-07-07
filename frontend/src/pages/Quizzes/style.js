import styled from 'styled-components';
import { Grid, Typography, Divider, Accordion } from '@mui/material';

export const TextPIN = styled.p`
  color: ${({ theme }) => theme.palette.primary.main};
  font-weight: bolder;
`;

export const HeaderTitle = styled(Grid)`
  margin-bottom: 10px;
`;

export const HeaderTitleText = styled(Typography)`
  font-weight: 500;
  font-size: 2.5rem;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  max-width: 90%;
  text-align: left;
`;

export const HeaderDivider = styled(Divider)`
  margin-bottom: 20px;
`;

export const CategoryTitle = styled.p`
  font-weight: 500;
  font-size: 1.3rem;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  text-align: left;
`;

export const WarningText = styled.p`
  font-weight: 400;
  font-size: 1.1rem;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  text-align: left;
  padding-left: 15px;
`;

export const StyledAccordion = styled(Accordion)`
  margin-bottom: 15px;
  border-radius: 5px;
  border: 1px solid gray;

  width: 100%;
`;

export const QuizBar = styled(Grid).attrs({ item: true })`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const QuizzesQuantity = styled.p``;

export const QuestionsQuantitty = styled.p`
  text-align: center;
`;

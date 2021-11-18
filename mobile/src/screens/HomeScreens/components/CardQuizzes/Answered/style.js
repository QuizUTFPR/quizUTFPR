import styled from 'styled-components';

import { QuizTitle } from '../style';

export const TeacherName = styled(QuizTitle)`
  font-size: ${({ theme }) => theme.fontSize - 3}px;
  font-family: 'PoppinsSemiBold';
`;

import styled from 'styled-components';

import { QuizTitle } from '../style';

export const TeacherName = styled(QuizTitle)`
  font-size: ${({ theme }) => theme.fontSize.normal}px;
  font-family: 'PoppinsSemiBold';
`;

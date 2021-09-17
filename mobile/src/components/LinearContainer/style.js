import styled from 'styled-components/native';

import { LinearGradient } from 'expo-linear-gradient';

export const QuestionContainer = styled(LinearGradient).attrs({
  colors: ['#4B24B1', '#5929D3'],
})`
  flex: 1;
  flex-direction: column;
`;

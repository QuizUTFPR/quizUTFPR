import styled from 'styled-components/native';

import { LinearGradient } from 'expo-linear-gradient';

// THEME
import theme from '../../styles/theme';

export const QuestionContainer = styled(LinearGradient).attrs({
  colors: theme.color.gradients.primary,
})`
  flex: 1;
  flex-direction: column;
`;

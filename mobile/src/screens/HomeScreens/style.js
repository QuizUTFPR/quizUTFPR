import styled from 'styled-components/native';

// DIMENSION TRANSFORMERS
import { widthPercentageToDp } from '@styles/dimensions';

export const StyledScrollView = styled.ScrollView.attrs({
  contentContainerStyle: {
    alignItems: 'center',
  },
})`
  width: ${widthPercentageToDp('100%')}px;
`;

export const QuizContainer = styled.View`
  margin-top: 10px;
`;

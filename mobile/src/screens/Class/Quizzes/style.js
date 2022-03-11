import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native-safe-area-context';

// DIMENSION TRANSFORMERS
import { widthPercentageToDp } from '@styles/dimensions';

export const ClassContainer = styled(SafeAreaView)`
  background: ${({ theme }) => theme.color.fill};
  padding-left: ${({ theme }) => theme.size.padding}px;
  padding-right: ${({ theme }) => theme.size.padding}px;
  flex: 1;
`;

export const StyledScrollView = styled.ScrollView.attrs({
  contentContainerStyle: {
    alignItems: 'center',
  },
})`
  width: ${widthPercentageToDp('100%')}px;
`;

export const Title = styled.Text`
  font-size: ${({ theme }) => theme.fontSize.medium}px;
  font-family: 'PoppinsBold';
`;

export const QuizContainer = styled.View`
  margin-top: 10px;
`;

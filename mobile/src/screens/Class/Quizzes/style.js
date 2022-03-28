import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native-safe-area-context';

// COMPONENTS
import CardQuizBasic from '@components/Card/Basic';

export const ClassContainer = styled(SafeAreaView)`
  background: ${({ theme }) => theme.color.fill};
  padding-left: ${({ theme }) => theme.size.padding}px;
  padding-right: ${({ theme }) => theme.size.padding}px;
  flex: 1;
`;

export const StyledScrollView = styled.ScrollView``;

export const Title = styled.Text`
  font-size: ${({ theme }) => theme.fontSize.medium}px;
  font-family: 'PoppinsBold';
`;

export const QuizContainer = styled.View`
  margin-top: 10px;
`;

export const StyledCardQuizBasic = styled(CardQuizBasic)`
  width: 100%;
  border: 1px solid ${({ theme }) => theme.color.blackRussian};
  background: ${({ theme }) => theme.color.white};
`;

import styled from 'styled-components';
import Constants from 'expo-constants';

import { Feather } from '@expo/vector-icons';

export const QuizContainer = styled.ScrollView`
  margin-top: 10px;
`;

export const SafeArea = styled.View`
  margin-top: ${Constants.statusBarHeight + 10}px;
`;

export const WrapperTags = styled.ScrollView`
  margin-right: -30px;
  max-height: 30px;
  margin-bottom: 10px;
`;

export const TextBolder = styled.Text`
  font-family: 'PoppinsBold';
  font-size: ${({ theme }) => theme.fontSize.normal}px;
`;

export const TagWrapper = styled.View`
  min-width: 60px;
  height: 30px;
  background: ${({ theme }) => theme.color.purple};
  margin: 0 3px;
  padding: 0 10px;
  border-radius: 30px;
  align-items: center;
  flex-direction: row;
`;

export const TagText = styled.Text`
  color: white;
  font-family: 'PoppinsSemiBold';
`;

export const RemoveButton = styled.TouchableOpacity`
  margin-left: 5px;
`;

export const RemoveIcon = styled(Feather).attrs({
  name: 'x',
  size: 24,
  color: 'white',
})``;

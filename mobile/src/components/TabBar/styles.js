import styled from 'styled-components/native';

// DIMENSIONS
import { heightPercentageToDp } from '@styles/dimensions';

export const StyledView = styled.View.attrs({ elevation: 5 })`
  flex-direction: row;
  height: ${`${heightPercentageToDp('10%')}px`};
  justify-content: center;
  align-items: center;
  border-top-left-radius: 40px;
  border-top-right-radius: 40px;
  padding-left: 20px;
  padding-right: 20px;
  background: ${({ theme }) => theme.color.fill};
`;

export const StyledTabButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  margin: 0 10px;
`;

export const StyledText = styled.Text`
  color: ${({ theme, isFocused }) => (isFocused ? theme.color.purple : 'grey')};
  font-family: 'PoppinsBold';
  font-size: ${({ theme }) => theme.fontSize.normal}px;
`;

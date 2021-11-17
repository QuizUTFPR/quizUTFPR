import styled from 'styled-components/native';

// DIMENSION TRANSFORMERS
import { heightPercentageToDp } from '@styles/dimensions';

export const StyledIconButton = styled.Text`
  margin-top: ${`${heightPercentageToDp('6%')}px`};
  align-self: flex-start;
  margin-left: -7px;
`;

export const StyledTitle = styled.Text`
  align-self: flex-start;
  font-size: ${({ theme }) => theme.fontSize + 12}px;
  font-family: 'PoppinsBlack';
  color: white;
`;

export const StyledText = styled.Text`
  align-self: flex-start;
  font-size: ${({ theme }) => theme.fontSize - 2}px;
  font-family: 'PoppinsRegular';
  color: white;
`;

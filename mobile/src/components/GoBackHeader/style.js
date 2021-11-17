import styled from 'styled-components/native';

import Constants from 'expo-constants';
import { StyledButton } from '@components/ButtonGradient/style';

export const GoBackButtonWrapper = styled(StyledButton).attrs({
  colors: ['#4B24B1', '#3b1b96'],
})`
  align-self: flex-start;
  align-items: center;
  width: 40px;
  height: 40px;
  margin-top: ${Constants.statusBarHeight + 10}px;
  margin-bottom: 20px;
`;

export const StyledIconButton = styled.Text``;

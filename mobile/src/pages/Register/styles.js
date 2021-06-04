import styled from 'styled-components/native';
import { IconButton, Title, Text, Button } from 'react-native-paper';

import Waves from '@assets/waves.svg';

export const BackgroundImage = styled(Waves)`
  position: absolute;
`;

export const StyledIconButton = styled(IconButton)`
  margin-top: 50px;
  align-self: flex-start;
  margin-left: -7px;
`;

export const StyledTitle = styled(Title)`
  align-self: flex-start;
  font-size: ${({ fontSize }) => fontSize + 12}px;
  font-family: 'RobotoBlack';
  color: white;
`;

export const StyledText = styled(Text)`
  align-self: flex-start;
  font-size: ${({ fontSize }) => fontSize - 4}px;
  font-family: 'RobotoRegular';
  color: white;
`;

export const InputWrapper = styled.View`
  padding-top: 170px;
  width: 100%;
`;

export const StyledTextButton = styled(Button)``;

export const WrapperButton = styled.View`
  margin-top: 50px;
  width: 70%;
`;

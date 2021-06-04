import styled from 'styled-components/native';
import Constants from 'expo-constants';
import { IconButton, Title, Text, Button } from 'react-native-paper';

import Waves from '@assets/waves.svg';

// DIMENSION TRANSFORMERS
import { widthPercentageToDp, heightPercentageToDp } from '@styles/dimensions';

export const BackgroundImage = styled(Waves)`
  position: absolute;
`;

export const StyledIconButton = styled(IconButton)`
  margin-top: ${heightPercentageToDp('6%')};
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
  padding-top: ${heightPercentageToDp('26%')};
  width: ${widthPercentageToDp('85%')};
`;

export const StyledTextButton = styled(Button)``;

export const WrapperButton = styled.View`
  margin-top: 50px;
  width: 70%;
`;

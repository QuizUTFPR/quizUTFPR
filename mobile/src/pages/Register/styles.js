import styled from 'styled-components/native';
import Button from '@components/Button';

import Waves from '@assets/waves.svg';

// DIMENSION TRANSFORMERS
import { widthPercentageToDp, heightPercentageToDp } from '@styles/dimensions';

export const BackgroundImage = styled(Waves)`
  margin-top: -80px;
  position: absolute;
`;

export const StyledTitle = styled.Text`
  align-self: flex-start;
  font-size: ${({ theme }) => theme.fontSize + 12}px;
  font-family: 'RobotoBlack';
  color: white;
`;

export const StyledText = styled.Text`
  align-self: flex-start;
  font-size: ${({ theme }) => theme.fontSize - 4}px;
  font-family: 'RobotoRegular';
  color: white;
`;

export const InputWrapper = styled.View`
  padding-top: ${`${heightPercentageToDp('14%')}px`};
  width: ${`${widthPercentageToDp('85%')}px`};
`;

export const StyledTextButton = styled(Button)`
  margin-top: ${`${heightPercentageToDp('0.5')}px`};
`;

export const WrapperButton = styled.View`
  margin-top: ${`${heightPercentageToDp('1.5')}px`};
  width: ${`${widthPercentageToDp('60%')}px`};
`;

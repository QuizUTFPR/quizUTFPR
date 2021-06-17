import styled from 'styled-components/native';

import Waves from '@assets/purpleWaves.svg';

// DIMENSION TRANSFORMERS
import { widthPercentageToDp, heightPercentageToDp } from '@styles/dimensions';

export const BackgroundImage = styled(Waves).attrs(({ theme }) => ({
  fill: theme.color.purple,
}))`
  margin-top: -80px;
  position: absolute;
`;

export const StyledTitle = styled.Text`
  align-self: flex-start;
  font-size: ${({ theme }) => theme.fontSize + 12}px;
  font-family: 'PoppinsBlack';
  color: white;
`;

export const StyledText = styled.Text`
  align-self: flex-start;
  font-size: ${({ theme }) => theme.fontSize - 4}px;
  font-family: 'PoppinsRegular';
  color: white;
`;

export const InputWrapper = styled.View`
  padding-top: ${`${heightPercentageToDp('20%')}px`};
  width: ${`${widthPercentageToDp('85%')}px`};
`;

export const StyledTextButton = styled.Text`
  margin-top: ${`${heightPercentageToDp('0.5%')}px`};
  font-family: 'PoppinsBold';
  font-size: ${({ theme }) => theme.fontSize - 3}px;
  padding: 10px;
`;

export const WrapperButton = styled.View`
  margin-top: ${`${heightPercentageToDp('1.5%')}px`};
  width: ${`${widthPercentageToDp('85%')}px`};
`;

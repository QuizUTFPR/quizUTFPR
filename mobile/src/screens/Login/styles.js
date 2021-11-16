import styled from 'styled-components/native';
import Waves from '@assets/purpleWaves.svg';

// DIMENSION TRANSFORMERS
import { widthPercentageToDp, heightPercentageToDp } from '@styles/dimensions';

export const BackgroundImage = styled(Waves).attrs(({ theme }) => ({
  fill: theme.color.purple,
}))`
  margin-left: -32px;
  margin-top: -80px;
  position: absolute;
`;

export const InputWrapper = styled.View`
  padding-top: ${`${heightPercentageToDp('25%')}px`};
  width: ${`${widthPercentageToDp('85%')}px`};
`;

export const StyledTextButton = styled.Text`
  margin-top: ${`${heightPercentageToDp('0.5%')}px`};
  font-family: 'PoppinsBold';
  font-size: ${({ theme }) => theme.fontSize - 3}px;
  padding: 10px;
`;

export const WrapperButton = styled.View`
  margin-top: ${`${heightPercentageToDp('10%')}px`};
  width: ${`${widthPercentageToDp('85%')}px`};
`;

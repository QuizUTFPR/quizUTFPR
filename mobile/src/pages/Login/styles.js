import styled from 'styled-components/native';
import { Button } from 'react-native-paper';

import Waves from '@assets/waves.svg';

// DIMENSION TRANSFORMERS
import { widthPercentageToDp, heightPercentageToDp } from '@styles/dimensions';

export const BackgroundImage = styled(Waves)`
  margin-top: -80px;
  position: absolute;
`;

export const InputWrapper = styled.View`
  padding-top: ${`${heightPercentageToDp('20%')}px`};
  width: ${`${widthPercentageToDp('85%')}px`};
`;

export const StyledTextButton = styled(Button)`
  margin-top: ${`${heightPercentageToDp('1')}px`};
`;

export const ForgotPasswordButton = styled(StyledTextButton)`
  align-self: flex-end;
`;

export const WrapperButton = styled.View`
  margin-top: ${`${heightPercentageToDp('10')}px`};
  width: ${`${widthPercentageToDp('60%')}px`};
`;

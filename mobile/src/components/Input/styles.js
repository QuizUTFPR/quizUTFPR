import styled from 'styled-components/native';
import { TextInput } from 'react-native';

import { widthPercentageToDp, heightPercentageToDp } from '@styles/dimensions';

export const InputWrapper = styled.View`
  width: ${`${widthPercentageToDp('85%')}px`};
  margin-top: ${`${heightPercentageToDp('2%')}px`};
`;

export const StyledTextInput = styled(TextInput)``;

import styled from 'styled-components/native';
import { TextInput } from 'react-native-paper';

import { widthPercentageToDp, heightPercentageToDp } from '@styles/dimensions';

export const InputWrapper = styled.View`
  width: ${widthPercentageToDp('85%')};
  margin-top: ${heightPercentageToDp('2%')};
`;

export const StyledLabel = styled.Text`
  align-self: flex-start;
  font-size: ${({ fontSize }) => fontSize - 5}px;
  font-family: 'RobotoRegular';
`;

export const StyledTextInput = styled(TextInput)``;

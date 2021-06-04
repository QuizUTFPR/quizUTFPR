import styled from 'styled-components/native';
import { TextInput } from 'react-native-paper';

export const InputWrapper = styled.View`
  width: 100%;
  margin-top: 15px;
`;

export const StyledLabel = styled.Text`
  align-self: flex-start;
  font-size: ${({ fontSize }) => fontSize - 5}px;
  font-family: 'RobotoRegular';
`;

export const StyledTextInput = styled(TextInput)``;

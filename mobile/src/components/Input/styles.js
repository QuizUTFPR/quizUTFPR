import styled from 'styled-components/native';

import { widthPercentageToDp, heightPercentageToDp } from '@styles/dimensions';

export const InputWrapper = styled.View`
  flex-direction: row;
  width: ${`${widthPercentageToDp('85%')}px`};
  margin-top: ${`${heightPercentageToDp('2%')}px`};
  align-items: center;
  justify-content: center;
  background: #eaeaf5;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 8px;
  height: 60px;
  border: 1.5px solid
    ${({ theme, error }) => (error ? 'red' : theme.color.fill)};
`;

export const LabelWrapper = styled.View`
  flex: 1;
`;

export const StyledTextInput = styled.TextInput``;

export const Label = styled.Text`
  font-family: 'PoppinsBold';
  position: absolute;
  margin-top: -25px;
  margin-left: -30px;
  background: #eaeaf5;
  padding-left: 2px;
  padding-right: 2px;
  color: ${({ theme, error }) => (error ? 'red' : theme.color.fill)};
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
`;

export const IconView = styled.View`
  margin-right: 10px;
`;

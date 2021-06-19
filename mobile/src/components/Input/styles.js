import styled from 'styled-components/native';

import { widthPercentageToDp, heightPercentageToDp } from '@styles/dimensions';

export const Wrapper = styled.View`
  position: relative;
`;

export const InputWrapper = styled.View`
  flex-direction: row;
  width: ${`${widthPercentageToDp('85%')}px`};
  align-items: center;
  background: #eaeaf5;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 8px;
  height: 60px;
  border: 1.5px solid
    ${({ theme, error }) => (error ? 'red' : theme.color.fill)};
  margin-bottom: 20px;
`;

export const StyledTextInput = styled.TextInput``;

export const Label = styled.Text`
  z-index: 10;
  font-family: 'PoppinsBold';
  background: #eaeaf5;
  padding-left: 2px;
  padding-right: 2px;
  font-size: ${({ theme }) => theme.fontSize - 2}px;
  color: ${({ theme, error }) => (error ? 'red' : theme.color.fill)};
  border-radius: 2px;

  position: absolute;
  left: 10px;
  top: -10px;
`;

export const IconView = styled.View`
  margin-right: 10px;
`;

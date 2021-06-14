import styled from 'styled-components/native';

import { widthPercentageToDp, heightPercentageToDp } from '@styles/dimensions';

export const InputWrapper = styled.View`
  flex-direction: row;
  width: ${`${widthPercentageToDp('85%')}px`};
  margin-top: ${`${heightPercentageToDp('2%')}px`};
  align-items: center;
  justify-content: center;
  background: white;
  padding: 10px;
  border-radius: 8px;
`;

export const LabelWrapper = styled.View`
  flex: 1;
`;

export const StyledTextInput = styled.TextInput``;

export const Label = styled.Text`
  font-family: 'RobotoBold';
`;

export const IconView = styled.View`
  margin-right: 10px;
`;

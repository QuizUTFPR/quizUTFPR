import styled from 'styled-components/native';
import { Text, Headline } from 'react-native-paper';

// COMPONENTS
import Button from '@components/Button';

// CUSTOM DIMENSIONS
import { widthPercentageToDp, heightPercentageToDp } from '@styles/dimensions';

export const Header = styled.View`
  width: ${`${widthPercentageToDp('90%')}px`};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const ScrollWrapper = styled.ScrollView`
  width: ${`${widthPercentageToDp('90%')}px`};
  flex: 1;
`;

export const CurrentQuestion = styled(Headline)`
  font-size: ${({ fontSize }) => fontSize + 2}px;
  font-family: 'RobotoRegular';
`;

export const QuestionDescription = styled.View`
  background-color: lightgrey;
  align-items: center;
  border-radius: 10px;
`;

export const QuestionImage = styled.Image`
  width: ${`${widthPercentageToDp('50%')}px`};
  height: ${`${heightPercentageToDp('25%')}px`};
  margin-top: ${`${heightPercentageToDp('1.2%')}px`};
  border-radius: 10px;
`;

export const QuestionText = styled(Text)`
  text-align: center;
  font-size: ${({ fontSize }) => fontSize + 5}px;
  font-family: 'RobotoRegular';
  padding-left: ${`${heightPercentageToDp('4%')}px`};
  padding-right: ${`${heightPercentageToDp('4%')}px`};
  padding-top: ${`${heightPercentageToDp('4%')}px`};
  padding-bottom: ${`${heightPercentageToDp('5%')}px`};
`;

export const AnswerContainer = styled.View`
  flex-direction: row;
  background: lightgrey;
  border-radius: 10px;
  height: ${`${heightPercentageToDp('6%')}px`};
  margin-top: ${`${heightPercentageToDp('2%')}px`};
  justify-content: space-between;
  align-items: center;
  padding-left: ${`${widthPercentageToDp('4%')}px`};
  padding-right: ${`${widthPercentageToDp('4%')}px`};
`;

export const AnswerText = styled(Text)`
  font-size: ${({ fontSize }) => fontSize + 1}px;
  font-family: 'RobotoRegular';
`;

export const Footer = styled.View``;

export const StyledButton = styled(Button)`
  width: ${`${widthPercentageToDp('100%')}px`};
  border-radius: 0;
`;

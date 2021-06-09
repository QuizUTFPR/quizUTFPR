import styled from 'styled-components/native';
import { Text, Headline } from 'react-native-paper';

// COMPONENTS
import Button from '@components/Button';

// CUSTOM DIMENSIONS
import { widthPercentageToDp, heightPercentageToDp } from '@styles/dimensions';

export const Header = styled.View`
  padding-top: ${`${heightPercentageToDp('2%')}px`};
  width: ${`${widthPercentageToDp('90%')}px`};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const ScrollWrapper = styled.ScrollView`
  height: ${`${heightPercentageToDp('78%')}px`};
`;

export const Body = styled.View`
  margin-top: ${`${heightPercentageToDp('5%')}px`};
  margin-bottom: ${`${heightPercentageToDp('1%')}px`};
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
  margin-top: -25px;
  border-radius: 10px;
`;

export const QuestionText = styled(Text)`
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

export const Footer = styled.View`
  position: absolute;
  bottom: 0;
`;

export const StyledButton = styled(Button)`
  width: ${`${widthPercentageToDp('100%')}px`};
`;

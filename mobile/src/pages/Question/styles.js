import styled from 'styled-components/native';
import { Text, Headline } from 'react-native-paper';

// COMPONENTS
import Button from '@components/Button';
import { Container, Wrapper } from '@components/Container/style';

// CUSTOM DIMENSIONS
import { widthPercentageToDp, heightPercentageToDp } from '@styles/dimensions';

export const QuestionContainer = styled(Container)``;
export const QuestionWrapper = styled(Wrapper)``;

export const Header = styled.View`
  width: ${`${widthPercentageToDp('90%')}px`};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background: blue;
`;

export const InformationsWrapper = styled.View`
  flex: 0.95;
  border-radius: 20px;
  background: white;
  opacity: 0.945;
  width: ${`${widthPercentageToDp('90%')}px`};
`;

export const ScrollWrapper = styled.ScrollView`
  padding-left: 20px;
  padding-right: 20px;
`;

export const CurrentQuestion = styled(Headline)`
  font-size: ${({ fontSize }) => fontSize + 2}px;
  font-family: 'RobotoRegular';
`;

export const QuestionDescription = styled.View`
  align-items: center;
  border-radius: 5px;
  margin-bottom: ${`${heightPercentageToDp('2%')}px`};
`;

export const QuestionImage = styled.Image`
  width: ${`${widthPercentageToDp('50%')}px`};
  height: ${`${heightPercentageToDp('25%')}px`};
  margin-top: ${`${heightPercentageToDp('1.2%')}px`};
  border-radius: 5px;
`;

export const QuestionText = styled(Text)`
  font-size: ${({ fontSize }) => fontSize + 5}px;
  font-family: 'RobotoBold';
  margin-top: ${`${heightPercentageToDp('2%')}px`};
`;

export const AnswerContainer = styled.TouchableOpacity`
  background: red;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  height: ${`${heightPercentageToDp('8%')}px`};
  margin-top: ${`${heightPercentageToDp('1.5%')}px`};
  border: 2px solid lightgrey;
`;

export const AnswerText = styled(Text)`
  font-size: ${({ fontSize }) => fontSize + 1}px;
  font-family: 'RobotoRegular';
`;

export const Footer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const StyledButton = styled(Button)`
  border-radius: 0;
  border-top-left-radius: 20px;
`;

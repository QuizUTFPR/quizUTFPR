import styled from 'styled-components/native';
import { Text, Headline } from 'react-native-paper';

// COMPONENTS
import Button, { StyledButton } from '@components/Button';
import { Container, Wrapper } from '@components/Container/style';

// CUSTOM DIMENSIONS
import { widthPercentageToDp, heightPercentageToDp } from '@styles/dimensions';

export const QuestionContainer = styled(Container)`
  background: #5026bd;
`;
export const QuestionWrapper = styled(Wrapper)``;

export const Header = styled.View`
  width: ${`${widthPercentageToDp('90%')}px`};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const InformationsWrapper = styled.View`
  background: white;
  border-radius: 20px;
  border-top-right-radius: 0;
  width: ${`${widthPercentageToDp('90%')}px`};
`;

export const ScrollWrapper = styled.ScrollView`
  padding-left: 20px;
  padding-right: 20px;
`;

export const CurrentQuestion = styled(Headline)`
  font-size: ${({ fontSize }) => fontSize + 2}px;
  font-family: 'RobotoBold';
  background: white;
  color: #171c26;
  padding: 5px;
  width: 100px;
  text-align: center;
  margin-bottom: -22px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
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
  color: #171c26;
  text-align: center;
  margin-top: ${`${heightPercentageToDp('2%')}px`};
  margin-bottom: ${`${heightPercentageToDp('-2.5%')}px`};
`;

export const AnswerContainer = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: ${`${heightPercentageToDp('8%')}px`};
  margin-top: ${`${heightPercentageToDp('1.5%')}px`};
  border-radius: 10px;
  border: 1.2px solid #d6e0ed;
  background: ${({ checked }) => (checked ? 'red' : 'white')};
`;

export const AnswerText = styled(Text)`
  font-size: ${({ fontSize }) => fontSize + 1}px;
  font-family: 'RobotoBold';
  color: #8da1bd;
`;

export const Footer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 5px;
`;

export const ConfirmButton = styled(StyledButton).attrs(({ fontSize }) => ({
  labelStyle: {
    fontSize: fontSize + 3,
    fontFamily: 'RobotoBold',
  },
}))`
  margin-top: 10px;
  border-radius: 20px;
  background: #fba92e;
  width: ${`${widthPercentageToDp('90%')}px`};
`;

export const WrapperProgress = styled.View``;

export const Progress = styled.View`
  position: absolute;
  bottom: 0;
  height: 17px;
  justify-content: center;
  align-items: flex-end;
  background: #fba92e;
  z-index: 5;
`;
export const ProgressBG = styled.View`
  position: absolute;
  bottom: 0;
  height: 17px;
  width: ${`${widthPercentageToDp('100%')}px`};
  background: #fcd599;
  z-index: 4;
`;

export const TextTimer = styled.Text`
  position: absolute;
  font-size: ${({ fontSize }) => fontSize - 4}px;
  bottom: 0px;
  right: 5px;
  font-family: 'RobotoBold';
  color: #5026bd;
  z-index: 100;
`;

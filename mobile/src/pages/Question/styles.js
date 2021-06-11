import styled from 'styled-components/native';
import { Text, Headline } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';

// COMPONENTS
import ButtonGradient from '@components/ButtonGradient';
import { Wrapper } from '@components/Container/style';

// CUSTOM DIMENSIONS
import { widthPercentageToDp, heightPercentageToDp } from '@styles/dimensions';

export const QuestionContainer = styled(LinearGradient).attrs({
  colors: ['#4B24B1', '#5929D3'],
})`
  flex: 1;
  flex-direction: column;
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
  border-radius: 40px;
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
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
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
  border-radius: 30px;
  background: ${({ checked }) => (checked ? '#4F26C0' : 'white')};
  border: ${({ checked }) => (checked ? 'none' : '0.5px solid #171c26')};
`;

export const AnswerText = styled(Text)`
  font-size: ${({ fontSize }) => fontSize + 1}px;
  font-family: 'RobotoBold';
  color: ${({ checked }) => (checked ? 'white' : '#171c26')};
`;

export const Footer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 10px;
`;

export const ConfirmButton = styled(ButtonGradient).attrs({
  colors: ['#FFC95C', '#FFC95C'],
})`
  border-bottom-left-radius: 40px;
  border-bottom-right-radius: 40px;
  width: ${`${widthPercentageToDp('90%')}px`};
`;

export const WrapperProgress = styled.View``;

export const Progress = styled.View`
  position: absolute;
  bottom: 0;
  height: 20px;
  justify-content: center;
  align-items: flex-end;
  background: #ffc95c;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  z-index: 5;
`;
export const ProgressBG = styled.View`
  position: absolute;
  bottom: 0;
  height: 20px;
  width: ${`${widthPercentageToDp('100%')}px`};
  background: #451faa;
  z-index: 4;
`;

export const TextTimer = styled.Text`
  position: absolute;
  font-size: ${({ fontSize }) => fontSize - 2}px;
  bottom: 0px;
  right: 6px;
  font-family: 'RobotoBold';
  color: white;
  z-index: 100;
`;

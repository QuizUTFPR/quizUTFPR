import styled from 'styled-components/native';

// COMPONENTS
import ButtonGradient from '@components/ButtonGradient';
import { Wrapper } from '@components/Container/style';

// CUSTOM DIMENSIONS
import { widthPercentageToDp, heightPercentageToDp } from '@styles/dimensions';

export const QuestionWrapper = styled(Wrapper)``;

export const Header = styled.View`
  width: ${`${widthPercentageToDp('90%')}px`};
  height: ${`${heightPercentageToDp('8.5%')}px`};
  justify-content: flex-end;
  flex-direction: row;
  align-items: center;
`;

export const InformationsWrapper = styled.View.attrs({ elevation: 15 })`
  flex: 0.95;
  background: white;
  border-radius: 40px;
  border-top-right-radius: 0;
  width: ${`${widthPercentageToDp('90%')}px`};
  overflow: hidden;
`;

export const ScrollWrapper = styled.ScrollView`
  padding-left: 20px;
  padding-right: 20px;
  margin-top: 10px;
  margin-bottom: 10px;
`;

export const CurrentQuestionView = styled.View.attrs({
  elevation: 15,
})`
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  overflow: hidden;
  padding: 5px;
  width: 100px;
  margin-bottom: -22px;
  background: white;
`;

export const CurrentQuestion = styled.Text`
  font-size: ${({ theme }) => theme.fontSize + 2}px;
  font-family: 'RobotoBold';
  color: #171c26;
  text-align: center;
`;

export const QuestionDescription = styled.View`
  align-items: center;
  border-radius: 5px;
  margin-bottom: ${`${heightPercentageToDp('2%')}px`};
`;

export const QuestionImage = styled.Image`
  width: ${`${widthPercentageToDp('50%')}px`};
  height: ${`${heightPercentageToDp('25%')}px`};
  border-radius: 5px;
`;

export const QuestionText = styled.Text`
  font-size: ${({ theme }) => theme.fontSize + 5}px;
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

export const AnswerText = styled.Text`
  font-size: ${({ theme }) => theme.fontSize + 1}px;
  font-family: 'RobotoBold';
  color: ${({ checked }) => (checked ? 'white' : '#171c26')};
`;

export const Footer = styled.View.attrs({ elevation: 15 })`
  flex-direction: row;
  justify-content: space-between;
`;

export const ConfirmButton = styled(ButtonGradient).attrs({
  colors: ['#FFC95C', '#FFC95C'],
})`
  border-bottom-left-radius: 40px;
  border-bottom-right-radius: 40px;
  width: ${`${widthPercentageToDp('90%')}px`};
`;

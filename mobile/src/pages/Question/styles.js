import styled from 'styled-components/native';

// COMPONENTS
import ButtonGradient from '@components/ButtonGradient';
import { Wrapper } from '@components/Container/style';

// CUSTOM DIMENSIONS
import { widthPercentageToDp, heightPercentageToDp } from '@styles/dimensions';

export const Container = styled.View`
  flex: 1;
`;

export const QuestionWrapper = styled(Wrapper)`
  margin-top: ${heightPercentageToDp('5%')}px;
`;

export const Header = styled.View`
  width: ${`${widthPercentageToDp('90%')}px`};
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
`;

export const InformationsWrapper = styled.View.attrs({ elevation: 15 })`
  flex: 0.9;
  background: white;
  border-radius: 40px;
  border-top-right-radius: 0;
  width: ${`${widthPercentageToDp('90%')}px`};
  overflow: hidden;
`;

export const ScrollWrapper = styled.ScrollView`
  padding-left: 20px;
  padding-right: 20px;
`;

export const CurrentQuestionView = styled.View.attrs({
  elevation: 15,
})`
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  overflow: hidden;
  width: 100px;
  background: white;
  margin-bottom: -27px;
`;

export const CurrentQuestion = styled.Text`
  font-size: ${({ theme }) => theme.fontSize}px;
  padding-top: 10px;
  padding-bottom: 10px;
  font-family: 'PoppinsBold';
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
  margin-top: ${`${heightPercentageToDp('2%')}px`};
  border-radius: 5px;
`;

export const QuestionText = styled.Text`
  font-size: ${({ theme }) => theme.fontSize + 5}px;
  font-family: 'PoppinsBlack';
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
  font-family: 'PoppinsSemiBold';
  color: ${({ checked }) => (checked ? 'white' : '#171c26')};
`;

export const Footer = styled.View.attrs({ elevation: 15 })`
  flex-direction: row;
  justify-content: space-between;
`;

export const ConfirmButton = styled(ButtonGradient).attrs({
  colors: ['#fdb646', '#f99f4c'],
})`
  border-bottom-left-radius: 30px;
  border-bottom-right-radius: 30px;
  width: ${`${widthPercentageToDp('90%')}px`};
`;

export const ExitButtonWrapper = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  margin-top: ${heightPercentageToDp('5%')}px;
  margin-left: ${heightPercentageToDp('2%')}px;
`;

export const StyledIconButton = styled.Text``;

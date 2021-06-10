import styled from 'styled-components/native';
import { Text, Headline } from 'react-native-paper';

// COMPONENTS
import Button, { StyledButton } from '@components/Button';
import { Container, Wrapper } from '@components/Container/style';

// CUSTOM DIMENSIONS
import { widthPercentageToDp, heightPercentageToDp } from '@styles/dimensions';

export const QuestionContainer = styled(Container)`
  background: #333d54;
`;
export const QuestionWrapper = styled(Wrapper)``;

export const Header = styled.View`
  width: ${`${widthPercentageToDp('90%')}px`};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const InformationsWrapper = styled.View`
  flex: 0.95;
  background: white;
  border-radius: 20px;
  width: ${`${widthPercentageToDp('90%')}px`};
`;

export const ScrollWrapper = styled.ScrollView`
  padding-left: 20px;
  padding-right: 20px;
`;

export const CurrentQuestion = styled(Headline)`
  font-size: ${({ fontSize }) => fontSize + 2}px;
  font-family: 'RobotoRegular';
  color: white;
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
  color: #2a4e79;
  text-align: center;
  margin-top: ${`${heightPercentageToDp('2%')}px`};
  margin-bottom: ${`${heightPercentageToDp('-2.5%')}px`};
`;

export const AnswerContainer = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  height: ${`${heightPercentageToDp('8%')}px`};
  margin-top: ${`${heightPercentageToDp('1.5%')}px`};
  border: 2px solid #e9eef5;
`;

export const AnswerText = styled(Text)`
  font-size: ${({ fontSize }) => fontSize + 1}px;
  font-family: 'RobotoRegular';
  color: #a9a9a9;
`;

export const Footer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 5px;
`;

export const ConfirmButton = styled(Button)`
  border-radius: 0;
  border-top-left-radius: 20px;
`;

export const SkeepButton = styled(StyledButton).attrs({
  labelStyle: {
    color: '#a9a9a9',
  },
})``;

import styled from 'styled-components/native';
import Constants from 'expo-constants';
import { StyledButton } from '@components/ButtonGradient/style';

// DIMENSION TRANSFORMERS
import { widthPercentageToDp, heightPercentageToDp } from '@styles/dimensions';

export const GoBackButtonWrapper = styled(StyledButton).attrs({
  colors: ['#4B24B1', '#3b1b96'],
})`
  align-self: flex-start;
  margin-left: 25px;
  align-items: center;
  width: 40px;
  height: 40px;
  margin-top: ${Constants.statusBarHeight + 10}px;
`;

export const TitleText = styled.Text`
  color: ${({ theme }) => theme.color.purple};
  font-size: ${({ theme }) => theme.fontSize + 3}px;
  font-family: 'PoppinsBold';
`;

export const QuizCard = styled.TouchableOpacity.attrs({ activeOpacity: 0.8 })`
  flex-direction: row;
  align-self: flex-start;
  align-items: center;
  justify-content: space-between;
  width: ${widthPercentageToDp('85%')}px;
  border-radius: 10px;
  margin-bottom: ${heightPercentageToDp('2%')}px;
  background: ${({ theme }) => theme.color.white};
`;

export const Description = styled.View`
  flex: 1;
`;

export const StyledView = styled.View`
  height: 100%;
  flex: 1;
`;

export const StyledImage = styled.Image`
  width: 35%;
  height: 100%;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
`;

export const QuizTitle = styled.Text.attrs({
  ellipsizeMode: 'tail',
  numberOfLines: 1,
})`
  font-size: ${({ theme }) => theme.fontSize - 2}px;
  color: ${({ theme }) => theme.color.fill};
  font-family: 'PoppinsBold';
  margin-left: 10px;
  margin-top: 5px;
`;

export const StyledIconButton = styled.Text``;

export const StyledScrollView = styled.ScrollView.attrs({
  contentContainerStyle: {
    alignItems: 'center',
  },
})`
  width: ${widthPercentageToDp('100%')}px;
`;

export const QuizContainer = styled.View`
  margin-top: 20px;
`;

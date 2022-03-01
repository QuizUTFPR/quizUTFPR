import styled from 'styled-components/native';
import Constants from 'expo-constants';
import { StyledButton } from '@components/ButtonGradient/style';

// DIMENSION TRANSFORMERS
import { widthPercentageToDp, heightPercentageToDp } from '@styles/dimensions';

export const QuizAttemptsHeader = styled.View`
  width: ${widthPercentageToDp('100%')}px;
  height: ${heightPercentageToDp('46%')}px;
`;

export const StyledImageBackground = styled.ImageBackground`
  flex: 1;
  justify-content: space-between;
  background: ${({ theme }) => theme.color.red};
`;

export const GoBackButtonWrapper = styled(StyledButton).attrs({
  colors: ['#4B24B1', '#3b1b96'],
})`
  margin-top: ${Constants.statusBarHeight + 10}px;
  margin-left: 25px;
  align-items: center;
  width: 40px;
  height: 40px;
`;

export const StyledIconButton = styled.Text``;

export const BottomDecoration = styled.View`
  width: ${widthPercentageToDp('100%')}px;
  height: ${heightPercentageToDp('4%')}px;
  border-top-left-radius: 50px;
  border-top-right-radius: 50px;
  background: #eaeaf5;
`;

export const Description = styled.View`
  width: ${widthPercentageToDp('100%')}px;
  margin-left: 22px;
`;

export const StyledText = styled.Text`
  font-family: ${({ title }) => (title ? 'PoppinsBold' : 'PoppinsSemiBold')};
  font-size: ${({ title }) =>
    ({ theme }) =>
      title ? theme.fontSize.medium : theme.fontSize.normal}px;
  color: ${({ title }) =>
    ({ theme }) =>
      title ? theme.color.purple : theme.color.black};
`;

export const Divider = styled.View`
  width: ${widthPercentageToDp('92%')}px;
  height: ${heightPercentageToDp('0.2%')}px;
  margin-top: ${heightPercentageToDp('2%')}px;
  background: ${({ theme }) => theme.color.whiteGrey};
  align-self: center;
`;

export const ButtonsContainer = styled.View`
  align-self: center;
  flex-direction: row;
  align-items: center;
  height: ${heightPercentageToDp('5%')}px;
  width: ${widthPercentageToDp('90%')}px;
  margin-top: ${widthPercentageToDp('3%')}px;
  margin-bottom: ${widthPercentageToDp('5%')}px;
`;

export const ButtonWrapper = styled.View`
  border-bottom-color: ${({ theme }) => theme.color.purple};
  border-bottom-width: ${({ selected }) => (selected ? '3' : '0')}px;
  margin-top: ${({ selected }) => (selected ? '3' : '0')}px;
  margin-right: ${widthPercentageToDp('5%')}px;
`;

export const StyledButtonNavigation = styled.Text`
  font-family: PoppinsBold;
  font-size: ${({ theme }) => theme.fontSize.normal}px;
  color: ${({ selected }) =>
    ({ theme }) =>
      selected ? theme.color.purple : theme.color.lightGrey};
`;

export const PlayButtonWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${heightPercentageToDp('-5%')}px;
  margin-right: ${widthPercentageToDp('4%')}px;
  justify-content: flex-end;
`;

export const ButtonStyled = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})``;

export const IconButtonWrapper = styled(StyledButton).attrs({
  colors: ['#4B24B1', '#3b1b96'],
})`
  flex-direction: row;
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;
`;

export const StyledButtonText = styled.Text`
  font-family: PoppinsBold;
  font-size: ${({ theme }) => theme.fontSize.normal}px;
  color: ${({ theme }) => theme.color.white};
  margin-left: ${widthPercentageToDp('1%')}px;
`;

export const StyledScrollView = styled.ScrollView.attrs({
  contentContainerStyle: {
    alignItems: 'center',
  },
})`
  background: ${({ theme }) => theme.color.lightBlueGrey};
  width: ${widthPercentageToDp('100%')}px;
`;

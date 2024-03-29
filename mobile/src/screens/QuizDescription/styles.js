import styled from 'styled-components/native';
import { StyledButton } from '@components/ButtonGradient/style';
import Constants from 'expo-constants';

import PodiumImage from '@assets/icons/podium.png';

// COMPONENTS
import { Container } from '@components/Container/style';
import { widthPercentageToDp, heightPercentageToDp } from '@styles/dimensions';

export const DetailsContainer = styled(Container)`
  background: ${({ theme }) => theme.color.fill};
`;

export const QuizDescriptionHeader = styled.View`
  width: ${widthPercentageToDp('100%')}px;
  height: ${heightPercentageToDp('40%')}px;
`;

export const StyledImageBackground = styled.ImageBackground.attrs({
  borderBottomLeftRadius: 30,
  borderBottomRightRadius: 30,
  resizeMode: 'cover',
})`
  flex: 1;
  justify-content: space-between;
  padding-left: 15px;
  padding-right: 15px;
  background: ${({ theme }) => theme.color.red};
  border-bottom-left-radius: 30px;
  border-bottom-right-radius: 30px;
`;

export const TopWrapperButtons = styled.View`
  flex-direction: row;
  margin-top: ${Constants.statusBarHeight}px;
  align-items: center;
  justify-content: space-between;
`;

export const GoBackButtonWrapper = styled(StyledButton).attrs({
  // colors: ['#fdb646', '#f99f4c'],
  colors: ['#4B24B1', '#3b1b96'],
})`
  align-items: center;
  width: 40px;
  height: 40px;
`;

export const Favorite = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})`
  /* margin-top: 20px; */
`;

export const StyledIconButton = styled.Text``;

export const StyledText = styled.Text`
  font-family: 'PoppinsBold';
  font-size: ${({ theme }) => theme.fontSize.normal}px;
  color: ${({ theme }) => theme.color.fill};
  margin-left: 5px;
`;

export const ButtonWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
  justify-content: ${({ resume }) => (resume ? 'space-between' : 'flex-end')};
`;

export const ButtonStyled = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})``;

export const PlayButtonWrapper = styled(StyledButton).attrs({
  // colors: ['#fdb646', '#f99f4c'],
  colors: ['#4B24B1', '#3b1b96'],
})`
  flex-direction: row;
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;
`;

export const ResumeButtonWrapper = styled(PlayButtonWrapper).attrs({})``;

export const GiveUPButtonWraper = styled(PlayButtonWrapper).attrs({
  colors: ['#fdb646', '#f99f4c'],
})``;

export const StyledScrollView = styled.ScrollView`
  flex: 1;
`;

export const BodyDescription = styled.View`
  padding-left: ${widthPercentageToDp('8%')}px;
  padding-right: ${widthPercentageToDp('8%')}px;
`;

export const StyledTitle = styled.Text`
  font-family: 'PoppinsBold';
  font-size: ${({ theme }) => theme.fontSize.normal}px;
  margin-top: ${heightPercentageToDp('2%')}px;
`;

export const StyledPIN = styled(StyledTitle)`
  font-family: 'PoppinsRegular';
  font-size: ${({ theme }) => theme.fontSize.normal}px;
  align-self: flex-start;
  margin-top: 0px;
  padding-right: 10px;
`;

export const StyledDescriptionText = styled.Text`
  font-family: 'PoppinsRegular';
  font-size: ${({ theme }) => theme.fontSize.normal}px;
  align-self: flex-start;
`;

export const TagsContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`;

export const StyledTag = styled.Text`
  font-family: 'PoppinsBold';
  font-size: ${({ theme }) => theme.fontSize.normal}px;
  margin-right: ${widthPercentageToDp('2%')}px;
  margin-bottom: ${heightPercentageToDp('1%')}px;
  padding-left: 15px;
  padding-right: 15px;
  border-radius: 20px;
  background: ${({ theme }) => theme.color.primary};
  color: ${({ theme }) => theme.color.white};
`;

export const QuizProgress = styled.View`
  background: ${({ theme }) => theme.color.fill};
  flex: 0.1;
  flex-direction: row;
  align-items: center;
  border-top-right-radius: 30px;
  border-top-left-radius: 30px;
  justify-content: center;
`;

export const StyledTitleProgress = styled.Text`
  font-family: 'PoppinsBold';
  color: white;
`;

export const StyledTextProgress = styled.Text`
  font-family: 'PoppinsSemiBold';
  color: white;
`;

export const PinWrapper = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})`
  flex-direction: row;
  align-items: center;
`;

export const PodiumIcon = styled.Image.attrs({
  source: PodiumImage,
})`
  height: 50px;
  width: 50px;
`;

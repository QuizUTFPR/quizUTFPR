import styled from 'styled-components/native';
import { StyledButton } from '@components/ButtonGradient';
// COMPONENTS
import { Container } from '@components/Container/style';
import { widthPercentageToDp, heightPercentageToDp } from '@styles/dimensions';

export const DetailsContainer = styled(Container)`
  background: ${({ theme }) => theme.color.fill};
`;

export const QuizDescriptionHeader = styled.View`
  width: ${widthPercentageToDp('100%')}px;
  height: ${heightPercentageToDp('35%')}px;
`;

export const StyledImageBackground = styled.ImageBackground.attrs({
  imageStyle: {
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
})`
  flex: 1;
`;

export const GoBackButtonWrapper = styled(StyledButton).attrs({
  // colors: ['#fdb646', '#f99f4c'],
  colors: ['#4B24B1', '#3b1b96'],
})`
  align-items: center;
  width: 40px;
  height: 40px;
  margin-top: ${heightPercentageToDp('5%')}px;
  margin-left: ${heightPercentageToDp('2%')}px;
`;

export const StyledIconButton = styled.Text``;

export const StyledText = styled.Text`
  font-family: 'PoppinsBold';
  font-size: ${({ theme }) => theme.fontSize + 1}px;
  color: ${({ theme }) => theme.color.fill};
  margin-left: 5px;
`;

export const ButtonStyled = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})`
  position: absolute;
  bottom: 15px;
  right: 15px;
`;

export const PlayButtonWrapper = styled(StyledButton).attrs({
  // colors: ['#fdb646', '#f99f4c'],
  colors: ['#4B24B1', '#3b1b96'],
})`
  flex-direction: row;
  align-items: center;
  width: ${widthPercentageToDp('33%')}px;
`;

export const StyledScrollView = styled.ScrollView`
  width: ${widthPercentageToDp('100%')}px;
`;

export const BodyDescription = styled.View`
  width: 100%;
  padding-left: ${widthPercentageToDp('8%')}px;
  padding-right: ${widthPercentageToDp('8%')}px;
`;

export const StyledTitle = styled.Text`
  font-family: 'PoppinsBold';
  font-size: ${({ theme }) => theme.fontSize + 5}px;
  margin-top: ${heightPercentageToDp('2%')}px;
  align-self: flex-start;
`;

export const StyledDescriptionText = styled.Text`
  font-family: 'PoppinsRegular';
  font-size: ${({ theme }) => theme.fontSize}px;
  align-self: flex-start;
`;

export const TagsContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`;

export const StyledTag = styled.Text`
  font-family: 'PoppinsBold';
  font-size: ${({ theme }) => theme.fontSize}px;
  margin-right: ${widthPercentageToDp('2%')}px;
  margin-bottom: ${heightPercentageToDp('1%')}px;
  padding-left: 15px;
  padding-right: 15px;
  border-radius: 20px;
  background: ${({ theme }) => theme.color.purple};
  color: ${({ theme }) => theme.color.white};
`;

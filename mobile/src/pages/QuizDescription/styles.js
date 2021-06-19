import styled from 'styled-components/native';
import { ImageBackground } from 'react-native';

import { widthPercentageToDp, heightPercentageToDp } from '@styles/dimensions';

export const QuizDescriptionHeader = styled.View`
  width: ${widthPercentageToDp('100%')}px;
  height: ${heightPercentageToDp('35%')}px;
`;

export const StyledImageBackground = styled.ImageBackground`
  flex: 1;
`;

export const GoBackButtonWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  align-content: center;
  width: ${widthPercentageToDp('45%')}px;
  height: ${heightPercentageToDp('6%')}px;
  margin-top: ${heightPercentageToDp('5%')}px;
  margin-left: ${heightPercentageToDp('2%')}px;
  border-radius: 5px;
  background: ${({ theme }) => theme.color.white};
`;

export const StyledIconButton = styled.Text``;

export const StyledText = styled.Text`
  font-family: 'PoppinsBold';
  font-size: ${({ theme }) => theme.fontSize + 1}px;
`;

export const PlayButtonWrapper = styled.View`
  position: relative;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  align-self: flex-end;
  width: ${widthPercentageToDp('33%')}px;
  height: ${heightPercentageToDp('6%')}px;
  margin-top: ${widthPercentageToDp('33%')}px;
  margin-right: ${widthPercentageToDp('2%')}px;
  border-radius: 5px;
  background: ${({ theme }) => theme.color.white};
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

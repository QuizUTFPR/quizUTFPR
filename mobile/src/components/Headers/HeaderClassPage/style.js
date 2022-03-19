import styled from 'styled-components/native';

import HeaderBackground from '@assets/patterns/sunburst.png';
import { widthPercentageToDp, heightPercentageToDp } from '@styles/dimensions';
import { Platform, StatusBar } from 'react-native';

export const HeaderWrapper = styled.View``;

export const HeaderInformations = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 30px;
`;

export const HeaderButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})``;

export const StyledWelcome = styled.Text`
  font-size: ${({ theme }) => theme.fontSize.large}px;
  font-family: 'PoppinsBlack';
  color: ${({ theme }) => theme.color.fill};
`;

export const BackgroundHeader = styled.ImageBackground.attrs({
  source: HeaderBackground,
  resizeMode: 'cover',
})`
  padding-top: ${Platform.OS === 'android' ? StatusBar.currentHeight : 0}px;
  justify-content: space-around;
  width: ${widthPercentageToDp('100%')}px;
  height: ${heightPercentageToDp('20%')}px;
  padding-bottom: 20px;
`;

export const StyledParagraph = styled.Text`
  margin-top: -10px;
  font-family: 'PoppinsRegular';
  font-size: ${({ theme }) => theme.fontSize.normal}px;
  color: ${({ theme }) => theme.color.fill};
`;

export const HeaderWelcomeTextView = styled.View`
  justify-content: center;
  align-items: flex-end;
`;

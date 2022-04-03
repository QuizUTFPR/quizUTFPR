import styled from 'styled-components/native';

import HeaderBackground from '@assets/patterns/sunburst.png';
import { widthPercentageToDp, heightPercentageToDp } from '@styles/dimensions';
import { Platform, StatusBar } from 'react-native';
import { StyledButton } from '@components/ButtonGradient/style';

export const HeaderWrapper = styled.SafeAreaView``;

export const HeaderInformations = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  padding: 0 30px;
`;

export const BackgroundHeader = styled.ImageBackground.attrs({
  source: HeaderBackground,
  resizeMode: 'cover',
})`
  padding-top: ${Platform.OS === 'android' ? StatusBar.currentHeight : 0}px;
  justify-content: space-around;
  width: ${widthPercentageToDp('100%')}px;
  height: ${heightPercentageToDp('18%')}px;
  padding-bottom: 20px;
`;

export const TextWrapper = styled.View`
  justify-content: center;
  margin-left: 30px;
  flex: 1;
`;

export const Title = styled.Text`
  font-size: ${({ theme }) => theme.fontSize.large}px;
  font-family: 'PoppinsBlack';
  color: ${({ theme }) => theme.color.fill};
`;

export const Paragraph = styled.Text.attrs({ numberOfLines: 2 })`
  margin-top: -10px;
  font-family: 'PoppinsRegular';
  font-size: ${({ theme }) => theme.fontSize.normal}px;
  color: ${({ theme }) => theme.color.fill};
  width: 100%;
`;

export const GoBackButtonWrapper = styled(StyledButton).attrs({
  colors: ['white', 'white'],
})`
  align-items: center;
  width: 40px;
  height: 40px;
`;

export const StyledIconButton = styled.Text``;

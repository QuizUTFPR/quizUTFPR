import styled from 'styled-components/native';
import { Platform, StatusBar } from 'react-native';

import HeaderBackground from '@assets/patterns/sunburst.png';
import { widthPercentageToDp, heightPercentageToDp } from '@styles/dimensions';
import ButtonGradient from '@components/ButtonGradient';

export const HeaderWrapper = styled.SafeAreaView``;

export const HeaderInformations = styled.View`
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 0 30px;
  margin-bottom: ${({ theme }) => theme.size.padding}px;
`;

export const HeaderButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})``;

export const SearchInput = styled.TextInput.attrs({})`
  padding-left: 10px;
  border-radius: 10px;
  min-height: 40px;
  flex: 1;
  font-family: 'PoppinsRegular';
`;

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
  align-items: center;
  justify-content: space-around;
  width: ${widthPercentageToDp('100%')}px;
  min-height: ${heightPercentageToDp('28%')}px;
  padding-bottom: 20px;
`;

export const InputWrapper = styled.View.attrs({ elevation: 10 })`
  background: white;
  flex-direction: row;
  border-radius: 20px;
  height: 50px;
  justify-content: center;
  align-items: center;
  padding-left: 10px;
  padding-right: ${({ theme }) => theme.size.padding}px;
  margin-left: ${({ theme }) => theme.size.padding}px;
  margin-right: ${({ theme }) => theme.size.padding}px;
  margin-top: ${({ theme }) => theme.size.padding}px;
`;

export const StyledParagraph = styled.Text`
  margin-top: -10px;
  font-family: 'PoppinsRegular';
  font-size: ${({ theme }) => theme.fontSize.normal}px;
  color: ${({ theme }) => theme.color.fill};
`;

export const HeaderWelcomeTextView = styled.View`
  justify-content: center;
  align-items: center;
`;

export const StyledButton = styled(ButtonGradient)`
  height: 60px;
  border-top-right-radius: 0;
  border-top-left-radius: 0;
`;

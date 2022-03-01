import styled from 'styled-components/native';
import { Platform, StatusBar } from 'react-native';

// DIMENSION TRANSFORMERS
import { widthPercentageToDp } from '@styles/dimensions';

// SVG's AS REACT COMPONENTS
import Pattern from '@assets/patterns/halftone.png';

// STATUS BAR HEIGHT
const statusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight : 0;

export const Container = styled.SafeAreaView`
  flex: 1;
  background: ${({ theme }) => theme.color.fill};
`;

export const ImageView = styled.ImageBackground.attrs({
  source: Pattern,
  resizeMode: 'cover',
})`
  padding-top: ${statusBarHeight + 5}px;
  align-items: center;
  justify-content: center;
  padding-left: 30px;
  padding-right: 30px;
  flex: 1;
  width: 100%;
`;

export const AnimationView = styled.View`
  flex: 0.8;
  width: ${widthPercentageToDp('80%')}px;
  align-self: center;
`;

export const InformationsCard = styled.View.attrs({ elevation: 15 })`
  align-items: center;
  justify-content: space-between;
  width: ${widthPercentageToDp('90%')}px;
  flex: 0.85;
  background: ${({ theme }) => theme.color.white};
  border-radius: 31px;
`;

export const Body = styled.View`
  align-items: center;
  padding: ${({ theme }) => theme.size.padding + 10}px;
  height: 100%;
`;

export const StyledTitle = styled.Text`
  text-align: center;
  font-family: 'PoppinsBold';
  font-size: ${({ theme }) => theme.fontSize.normal}px;
`;

export const StyledText = styled.Text`
  text-align: center;
  margin-bottom: 10px;
  font-family: 'PoppinsSemiBold';
  font-size: ${({ theme }) => theme.fontSize.normal}px;
`;

export const Footer = styled.View`
  position: absolute;
  bottom: 0;
  width: 100%;
`;

export const RedoButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  height: 35px;
  justify-content: center;
`;
export const RedoButtonText = styled.Text`
  font-family: 'PoppinsBold';
  font-size: ${({ theme }) => theme.fontSize.normal}px;
  color: ${({ theme }) => theme.color.fill};
  text-align: center;
  opacity: 0.2;
`;

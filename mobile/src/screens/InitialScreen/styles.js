import styled from 'styled-components/native';

// DIMENSION TRANSFORMERS
import { widthPercentageToDp } from '@styles/dimensions';

// SVG's AS REACT COMPONENTS
import Pattern from '@assets/patterns/halftone.png';
import LogoUTFPR from '@assets/utfpr/utfpr-transparente-branco.png';

export const Container = styled.View`
  align-items: center;
  flex: 1;
  background: ${({ theme }) => theme.color.fill};
`;

export const ImageView = styled.ImageBackground.attrs({
  source: Pattern,
  resizeMode: 'cover',
})`
  justify-content: center;
  padding-left: 30px;
  padding-right: 30px;
  flex: 1;
  width: ${widthPercentageToDp('100%')}px;
`;

export const Logo = styled.Image.attrs({
  source: LogoUTFPR,
  resizeMode: 'contain',
})`
  flex: 0.5;
  width: ${widthPercentageToDp('80%')}px;
  align-self: center;
`;

export const WrapperButton = styled.SafeAreaView`
  margin-top: 15px;
`;

export const StyledTitle = styled.Text`
  font-size: ${({ theme }) => theme.fontSize.medium}px;
  font-family: 'PoppinsBlack';
  color: ${({ theme }) => theme.color.fill};
`;

export const StyledParagraph = styled.Text`
  font-family: 'PoppinsRegular';
  font-size: ${({ theme }) => theme.fontSize.normal}px;
  color: ${({ theme }) => theme.color.fill};
`;

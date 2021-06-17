import styled from 'styled-components/native';

// DIMENSION TRANSFORMERS
import { widthPercentageToDp } from '@styles/dimensions';

// SVG's AS REACT COMPONENTS
import Pattern from '@assets/patterns/halftone.png';

export const Container = styled.SafeAreaView`
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
`;

export const AnimationView = styled.View`
  flex: 0.7;
  width: ${widthPercentageToDp('80%')}px;
  align-self: center;
`;

export const WrapperButton = styled.SafeAreaView`
  margin-top: 15px;
`;

export const StyledTitle = styled.Text`
  font-size: ${({ theme }) => theme.fontSize + 12}px;
  font-family: 'PoppinsBlack';
  color: ${({ theme }) => theme.color.fill};
`;

export const StyledParagraph = styled.Text`
  font-family: 'PoppinsRegular';
  font-size: ${({ theme }) => theme.fontSize - 2}px;
  color: ${({ theme }) => theme.color.fill};
`;

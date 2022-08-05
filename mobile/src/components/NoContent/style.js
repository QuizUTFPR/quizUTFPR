import styled from 'styled-components/native';
import LottieView from 'lottie-react-native';

// Dimensions
import { widthPercentageToDp, heightPercentageToDp } from '@styles/dimensions';

export const Wrapper = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const Title = styled.Text.attrs({
  ellipsizeMode: 'tail',
  numberOfLines: 1,
  adjustsFontSizeToFit: true,
})`
  font-size: ${({ theme }) => theme.fontSize.medium}px;
  color: ${({ theme }) => theme.color.fill};
  font-family: 'PoppinsBold';
  margin-left: 10px;
  margin-top: 5px;
  text-align: center;
`;

export const Subtitle = styled.Text.attrs({
  ellipsizeMode: 'tail',
  numberOfLines: 5,
  adjustsFontSizeToFit: true,
})`
  text-align: center;
  color: ${({ theme }) => theme.color.fill};
  font-size: ${({ theme }) => theme.fontSize.normal}px;
  font-family: 'PoppinsRegular';
`;

export const StyledImage = styled.Image`
  width: ${widthPercentageToDp('80%')}px;
  height: ${heightPercentageToDp('40%')}px;
`;

export const StyledLottieView = styled(LottieView)`
  width: ${widthPercentageToDp('80%')}px;
  height: ${heightPercentageToDp('40%')}px;
`;

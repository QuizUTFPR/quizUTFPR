import styled from 'styled-components/native';

// COMPONENTS
import { StyledButton } from '@components/ButtonGradient/style';

// DIMENSIONS
import { widthPercentageToDp, heightPercentageToDp } from '@styles/dimensions';

export const ClassInfoHeader = styled.View`
  width: ${widthPercentageToDp('100%')}px;
  height: ${heightPercentageToDp('30%')}px;
`;

export const StyledImageBackground = styled.ImageBackground.attrs({
  resizeMode: 'cover',
})`
  flex: 1;
  justify-content: space-between;
  padding-left: 15px;
  padding-right: 15px;
  background: ${({ theme }) => theme.color.red};
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

export const ButtonWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
  justify-content: flex-end;
`;

export const ButtonStyled = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})``;

export const SubscribeButton = styled(StyledButton).attrs({
  // colors: ['#fdb646', '#f99f4c'],
  colors: ['#4B24B1', '#3b1b96'],
})`
  flex-direction: row;
  align-items: center;
  width: 150px;
  padding-left: ${({ theme }) => theme.size.padding + 5}px;
  padding-right: ${({ theme }) => theme.size.padding + 5}px;
`;

export const StyledText = styled.Text`
  font-family: 'PoppinsBold';
  color: ${({ theme }) => theme.color.white};
`;

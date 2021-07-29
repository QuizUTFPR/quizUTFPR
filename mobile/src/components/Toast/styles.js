import styled from 'styled-components/native';
import { Animated } from 'react-native';

// DIMENSION TRANSFORMERS
import { heightPercentageToDp } from '@styles/dimensions';

const correctColor = (toastType, theme) => {
  if (toastType === 'error') return theme.color.red;
  if (toastType === 'success') return theme.color.green;
  return theme.color.blue;
};

export const Wrapper = styled.View`
  align-items: center;
`;

export const StyledView = styled(Animated.View)`
  position: absolute;
  bottom: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  min-height: ${heightPercentageToDp('7%')}px;
  padding-top: 2px;
  padding-bottom: 2px;
  padding-left: 10px;
  padding-right: 10px;
  background: ${({ theme }) => theme.color.white};
  border: 1px solid ${({ theme, type }) => correctColor(type, theme)};
  border-radius: 30px;
`;

export const StyledText = styled.Text`
  font-size: ${({ theme }) => theme.fontSize - 2.5}px;
  font-family: 'PoppinsRegular';
  color: ${({ theme, type }) => correctColor(type, theme)};
  margin-left: 2%;
`;

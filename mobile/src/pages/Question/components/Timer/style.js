import styled from 'styled-components/native';
import { Platform } from 'react-native';

// CUSTOM DIMENSIONS
import { widthPercentageToDp } from '@styles/dimensions';

const heightTimer = Platform.OS === 'ios' ? 30 : 20;
const positionBottomText = Platform.OS === 'ios' ? 4 : -5;
const positionRightText = Platform.OS === 'ios' ? 20 : 5;

export const WrapperProgress = styled.View``;

export const Progress = styled.View`
  position: absolute;
  bottom: 0;
  height: ${heightTimer}px;
  justify-content: center;
  align-items: flex-end;
  background: #f99f4c;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  z-index: 5;
`;
export const ProgressBG = styled.View`
  position: absolute;
  bottom: 0;
  height: ${heightTimer}px;
  width: ${`${widthPercentageToDp('100%')}px`};
  /* background: #451faa; */
  background: rgba(0, 0, 0, 0.2);
  z-index: 4;
`;

export const TextTimer = styled.Text`
  position: absolute;
  font-size: ${({ theme }) => theme.fontSize}px;
  bottom: ${positionBottomText}px;
  right: ${positionRightText}px;
  font-family: 'PoppinsBold';
  color: white;
  z-index: 100;
`;

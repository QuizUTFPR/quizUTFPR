import styled from 'styled-components/native';

// CUSTOM DIMENSIONS
import { widthPercentageToDp } from '@styles/dimensions';

export const WrapperProgress = styled.View``;

export const Progress = styled.View`
  position: absolute;
  bottom: 0;
  height: 20px;
  justify-content: center;
  align-items: flex-end;
  background: #ffc95c;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  z-index: 5;
`;
export const ProgressBG = styled.View`
  position: absolute;
  bottom: 0;
  height: 20px;
  width: ${`${widthPercentageToDp('100%')}px`};
  /* background: #451faa; */
  background: rgba(0, 0, 0, 0.2);
  z-index: 4;
`;

export const TextTimer = styled.Text`
  position: absolute;
  font-size: ${({ theme }) => theme.fontSize - 2}px;
  bottom: 0px;
  right: 6px;
  font-family: 'RobotoBold';
  color: white;
  z-index: 100;
`;

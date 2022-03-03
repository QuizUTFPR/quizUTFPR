import styled from 'styled-components/native';

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

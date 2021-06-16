import styled from 'styled-components/native';

// DIMENSIONS
import { heightPercentageToDp } from '@styles/dimensions';

export const StyledView = styled.View`
  flex-direction: row;
  height: ${`${heightPercentageToDp('12%')}px`};
  border-top-left-radius: 40px;
  border-top-right-radius: 40px;
  padding-left: 20px;
  padding-right: 20px;
  background: ${({ theme }) => theme.color.fill};
`;

export const StyledTabButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
`;

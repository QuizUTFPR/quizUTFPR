import styled from 'styled-components/native';

// DIMENSIONS
import { widthPercentageToDp, heightPercentageToDp } from '@styles/dimensions';

export const StyledView = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: ${`${heightPercentageToDp('12%')}px`};
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  padding-left: 20px;
  padding-right: 20px;
  background: purple;
`;

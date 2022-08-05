import styled from 'styled-components/native';

import { widthPercentageToDp } from '@styles/dimensions';

export const StyledContainer = styled.View`
  background: ${({ theme }) => theme.color.fill};
  padding-top: ${({ theme }) => theme.size.padding + 5}px;
  flex: 1;
`;

export const StyledFlatList = styled.FlatList`
  width: ${widthPercentageToDp('100%')}px;
  padding-left: ${({ theme }) => theme.size.padding}px;
  padding-right: ${({ theme }) => theme.size.padding}px;
`;

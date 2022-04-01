import styled from 'styled-components/native';

export const RankingContainer = styled.View`
  background: ${({ theme }) => theme.color.fill};
  padding-left: ${({ theme }) => theme.size.padding}px;
  padding-right: ${({ theme }) => theme.size.padding}px;
  padding-top: ${({ theme }) => theme.size.padding + 5}px;
  flex: 1;
`;

export const StyledFlatList = styled.FlatList`
  /* padding-bottom: 200px; */
`;

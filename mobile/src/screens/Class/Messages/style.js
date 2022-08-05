import styled from 'styled-components/native';

export const ClassContainer = styled.View`
  background: ${({ theme }) => theme.color.fill};
  padding-left: ${({ theme }) => theme.size.padding}px;
  padding-right: ${({ theme }) => theme.size.padding}px;
  padding-top: ${({ theme }) => theme.size.padding + 5}px;
  flex: 1;
`;

export const StyledScrollView = styled.ScrollView`
  margin-bottom: ${({ theme }) => theme.size.margin + 10}px;
`;

export const Title = styled.Text`
  font-size: ${({ theme }) => theme.fontSize.medium}px;
  font-family: 'PoppinsBold';
`;

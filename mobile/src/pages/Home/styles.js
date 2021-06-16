import styled from 'styled-components/native';

export const StyledTitle = styled.Text`
  margin-top: 20px;
  font-size: ${({ theme }) => theme.fontSize + 12}px;
  font-family: 'RobotoBlack';
  color: ${({ theme }) => theme.color.fill};
`;

export const StyledParagraph = styled.Text`
  font-family: 'RobotoRegular';
  font-size: ${({ theme }) => theme.fontSize}px;
  color: ${({ theme }) => theme.color.fill};
`;

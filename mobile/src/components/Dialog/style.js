import styled from 'styled-components/native';

export const Wrapper = styled.View.attrs({ elevation: 15 })`
  background: ${({ theme }) => theme.color.fill};
  padding: ${({ theme }) => theme.size.padding}px;
  margin-left: ${({ theme }) => theme.size.margin + 10}px;
  margin-top: ${({ theme }) => theme.size.margin + 30}px;
  margin-right: ${({ theme }) => theme.size.margin + 10}px;
  flex: 0.8;
  border-radius: 20px;
  justify-content: center;
`;

export const StyledWrapperButtons = styled.View``;

export const StyledWrapperChildren = styled.View`
  align-items: center;
  flex: 1;
`;

export const StyledModal = styled.Modal`
  background: blue;
`;

export const StyledText = styled.Text`
  text-align: center;
  font-family: 'PoppinsBlack';
  font-size: ${({ theme }) => theme.fontSize + 5}px;
`;

export const StyledTitle = styled.Text`
  color: ${({ theme }) => theme.color};
  font-family: 'PoppinsBlack';
  font-size: ${({ theme }) => theme.fontSize + 10}px;
  margin-bottom: ${({ theme }) => theme.size.margin + 10}px;
`;

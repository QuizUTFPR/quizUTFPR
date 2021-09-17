import styled from 'styled-components/native';

export const StyledButton = styled.TouchableOpacity`
  height: 60px;
  background: ${({ theme }) => theme.color.backgroundButton};
  justify-content: center;
  border-radius: 30px;
`;

export const StyledText = styled.Text`
  font-family: 'PoppinsBold';
  font-size: ${({ theme }) => theme.fontSize}px;
  color: ${({ theme }) => theme.color.textButton};
  text-align: center; ;
`;

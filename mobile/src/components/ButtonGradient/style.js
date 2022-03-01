import styled from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';

export const WrapperButton = styled.TouchableOpacity``;

export const StyledButton = styled(LinearGradient)`
  height: 60px;
  justify-content: center;
  border-radius: 30px;
`;

export const StyledText = styled.Text`
  font-family: 'PoppinsBold';
  font-size: ${({ theme }) => theme.fontSize.normal}px;
  color: ${({ theme }) => theme.color.fill};
  text-align: center;
`;

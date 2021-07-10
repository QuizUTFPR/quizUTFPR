import styled from 'styled-components/native';
import ButtonGradient from '@components/ButtonGradient';

export const Wrapper = styled.View.attrs({ elevation: 15 })`
  background: ${({ theme }) => theme.color.fill};
  padding: ${({ theme }) => theme.size.padding}px;
  margin-left: ${({ theme }) => theme.size.margin + 10}px;
  margin-right: ${({ theme }) => theme.size.margin + 10}px;
  margin-top: ${({ theme }) => theme.size.margin + 30}px;
  margin-bottom: ${({ theme }) => theme.size.margin + 30}px;
  border-radius: 30px;
  justify-content: space-between;
  flex: 1;
`;

export const StyledWrapperButtons = styled.View`
  margin-top: ${({ theme }) => theme.size.margin + 10}px;
`;

export const StyledWrapperChildren = styled.View`
  align-items: center;
`;

export const StyledModal = styled.Modal`
  background: blue;
`;

export const StyledText = styled.Text`
  margin-top: 20px;
  text-align: center;
  font-family: 'PoppinsSemiBold';
  font-size: ${({ theme }) => theme.fontSize + 5}px;
`;

export const StyledTitle = styled.Text`
  color: ${({ theme }) => theme.color.fill};
  font-family: 'PoppinsBlack';
  font-size: ${({ theme }) => theme.fontSize + 10}px;
  margin-bottom: ${({ theme }) => theme.size.margin + 10}px;
`;

export const FirstButton = styled(ButtonGradient)``;

export const SecondButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  height: 50px;
  justify-content: center;
`;
export const SecondButtonText = styled.Text`
  font-family: 'PoppinsBold';
  font-size: ${({ theme }) => theme.fontSize}px;
  color: ${({ theme }) => theme.color.fill};
  text-align: center;
`;

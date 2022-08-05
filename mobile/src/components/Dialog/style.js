import styled from 'styled-components/native';
import ButtonGradient from '@components/ButtonGradient';
import { heightPercentageToDp } from '@styles/dimensions';

export const Wrapper = styled.View.attrs({ elevation: 15 })`
  background: ${({ theme }) => theme.color.fill};
  padding: ${({ theme }) => theme.size.padding}px;
  margin-left: ${({ theme }) => theme.size.margin + 10}px;
  margin-right: ${({ theme }) => theme.size.margin + 10}px;
  border-radius: 30px;
  justify-content: space-between;

  top: ${({ propHeight }) => heightPercentageToDp('50%') - propHeight / 2}px;

  /* margin-top: ${({ theme }) => theme.size.margin + 30}px; */
  /* margin-bottom: ${({ theme }) => theme.size.margin + 30}px; */
  /* flex: 1; */
  /* justify-content: center; */
  /* align-items: center; */
`;

export const StyledWrapperButtons = styled.View`
  margin-top: ${({ theme }) => theme.size.margin + 10}px;
`;

export const StyledWrapperChildren = styled.View`
  align-items: center;
`;

export const StyledModal = styled.Modal`
  background: red;
`;

export const StyledText = styled.Text`
  margin-top: 20px;
  text-align: center;
  font-family: 'PoppinsSemiBold';
  font-size: ${({ theme }) => theme.fontSize.normal}px;
`;

export const StyledTitle = styled.Text`
  color: ${({ theme }) => theme.color.fill};
  font-family: 'PoppinsBlack';
  font-size: ${({ theme }) => theme.fontSize.normal}px;
  margin-bottom: ${({ theme }) => theme.size.margin + 10}px;
  text-align: center;
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
  font-size: ${({ theme }) => theme.fontSize.normal}px;
  color: ${({ theme }) => theme.color.fill};
  text-align: center;
`;

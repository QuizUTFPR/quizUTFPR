import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native-safe-area-context';

export const ClassContainer = styled(SafeAreaView)`
  background: ${({ theme }) => theme.color.fill};
  padding-left: ${({ theme }) => theme.size.padding}px;
  padding-right: ${({ theme }) => theme.size.padding}px;
  flex: 1;
  padding-top: -${({ theme }) => theme.size.margin + 15}px;
`;

export const StyledScrollView = styled.ScrollView`
  margin-bottom: ${({ theme }) => theme.size.margin + 10}px;
`;

export const Title = styled.Text`
  font-size: ${({ theme }) => theme.fontSize.medium}px;
  font-family: 'PoppinsBold';
`;

export const DetailsContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin-bottom: ${({ theme }) => theme.size.margin}px;
  margin-top: ${({ theme }) => theme.size.margin}px;
`;

export const DetailCard = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 114px;
  height: 40px;
  border-radius: 50px;
  padding-left: 10px;
  padding-right: 5px;
  background: ${({ theme }) => theme.color.lightPurple};
`;

export const StyledText = styled.Text`
  font-size: ${({ theme }) => theme.fontSize.normal}px;
  font-family: 'PoppinsSemiBold';
  flex: 1;
  text-align: center;
  overflow: hidden;
`;

export const Subtitle = styled.Text`
  font-family: 'PoppinsBold';
`;

export const StyledDescription = styled.Text`
  font-family: 'PoppinsRegular';
`;

export const Footer = styled.View`
  width: 100%;
  align-items: center;
  position: absolute;
  bottom: 2px;
  align-self: center;
`;

export const StyledCancel = styled.Text`
  font-family: 'PoppinsBold';
  text-decoration: underline;
  color: ${({ theme }) => theme.color.lightGrey};
`;

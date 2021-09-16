import styled from 'styled-components/native';

export const WrapperMyDrawer = styled.SafeAreaView``;

export const Avatar = styled.Image.attrs({
  resizeMode: 'center',
})`
  width: 100%;
  height: 20%;
  border-radius: 100px;
  align-self: center;
  margin-top: 40px;
`;

export const StudentName = styled.Text`
  text-align: center;
  font-family: 'PoppinsBold';
  font-size: ${({ theme }) => theme.fontSize}px;
  color: ${({ theme }) => theme.color.fill};
  margin-bottom: 10px;
  margin-top: 10px;
`;

export const Divider = styled.View`
  background: ${({ theme }) => theme.color.fill};
  height: 2px;
  margin-left: 10px;
  margin-right: 10px;
  border-radius: 10px;
  opacity: 0.1;
  margin-bottom: -20px;
`;

export const DrawerLabelStyled = styled.Text.attrs({
  adjustsFontSizeToFit: true,
})`
  color: ${({ color }) => color};
  font-weight: bold;
`;

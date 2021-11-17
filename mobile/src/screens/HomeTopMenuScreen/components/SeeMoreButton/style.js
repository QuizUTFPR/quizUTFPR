import styled from 'styled-components/native';

export const SeeMore = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})`
  background: red;
  height: 30px;
  width: 100px;
  border-radius: 5px;
  margin-top: 10px;
  align-self: flex-end;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.color.purple};
`;

export const SeeMoreText = styled.Text`
  color: ${({ theme }) => theme.color.fill};
  font-family: 'PoppinsBold';
`;

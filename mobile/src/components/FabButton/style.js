import styled from 'styled-components/native';

export const StyledButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  height: 45px;
  width: 45px;
  border-radius: 45px;
  background: ${({ theme }) => theme.color.backgroundButton};

  position: absolute;
  z-index: 1;
  bottom: 15px;
  right: 20px;
  justify-content: center;
  align-items: center;
`;

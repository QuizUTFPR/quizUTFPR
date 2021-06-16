import styled from 'styled-components/native';

export const HeaderWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background: red;
`;

export const MiddleContent = styled.View`
  flex: 1;
  background: blue;
`;

export const IconButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.6,
})``;

import styled from 'styled-components';

import { Feather } from '@expo/vector-icons';

export const Wrapper = styled.View`
  flex-direction: row;
  align-items: center;
  border-radius: 5px;
  background: ${({ theme }) => theme.color.lightBlueGrey};
  border: 2px solid ${({ theme }) => theme.color.purple};
  padding: 10px 0;
  flex-wrap: wrap;
  width: 100%;
`;

export const StyledInput = styled.TextInput`
  padding-left: 10px;
  font-family: 'PoppinsRegular';
  margin-top: 5px;
  width: 100%;
`;

export const Chip = styled.View`
  min-width: 60px;
  height: 30px;
  background: ${({ theme }) => theme.color.purple};
  margin: 3px;
  padding: 0 5px;
  align-items: center;
  border-radius: 30px;
  flex-direction: row;
  justify-content: space-around;
`;

export const TextChip = styled.Text.attrs({ numberOfLines: 1 })`
  margin: 0 10px;
  color: white;
  font-family: 'PoppinsSemiBold';
`;

export const RemoveButton = styled.TouchableOpacity``;

export const RemoveIcon = styled(Feather).attrs({
  name: 'x',
  size: 24,
  color: 'white',
})``;

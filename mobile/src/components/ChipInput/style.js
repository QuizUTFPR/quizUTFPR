import styled from 'styled-components';
import { widthPercentageToDp } from '@styles/dimensions';

import { Feather } from '@expo/vector-icons';

export const Wrapper = styled.View`
  background: white;
  border-radius: 20px;
  min-height: 50px;
  flex-direction: column;
  justify-content: center;
  padding-left: 10px;
  padding-right: 10px;
  width: ${widthPercentageToDp('90%')}px;
`;

export const ChipWrapper = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`;

export const StyledInput = styled.TextInput`
  border-radius: 10px;
  height: 40px;
  font-family: 'PoppinsRegular';
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

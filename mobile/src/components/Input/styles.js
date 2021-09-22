import styled from 'styled-components/native';
import { widthPercentageToDp } from '@styles/dimensions';

export const Wrapper = styled.View`
  position: relative;
  margin-bottom: 25px;
`;

export const InputWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: ${`${widthPercentageToDp('85%')}px`};
  background: ${({ theme }) => theme.color.lightBlueGrey};
  padding-left: 10px;
  border-radius: 8px;
  height: 55px;
  border: 1.5px solid
    ${({ theme, error }) => (error ? 'red' : theme.color.fill)};
`;

export const StyledTextInput = styled.TextInput`
  height: 100%;
  flex: 1;
`;

export const Label = styled.Text`
  z-index: 10;
  font-family: 'PoppinsSemiBold';
  background: ${({ theme }) => theme.color.lightBlueGrey};
  padding-left: 2px;
  padding-right: 2px;
  font-size: ${({ theme }) => theme.fontSize - 4}px;
  color: ${({ theme, error }) => (error ? 'red' : theme.color.fill)};
  border-radius: 2px;

  position: absolute;
  left: 10px;
  top: -10px;
`;

export const IconView = styled.View`
  margin-right: 10px;
`;

export const InputView = styled.View`
  flex-direction: row;
  align-items: center;
  flex: 1;
  height: 100%;
`;

export const ShowPasswordView = styled.TouchableOpacity.attrs({
  activeOpacity: 0.5,
})`
  padding: 10px;
`;

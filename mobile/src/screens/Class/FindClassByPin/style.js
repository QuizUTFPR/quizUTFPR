import styled from 'styled-components/native';

export const InputWrapper = styled.View`
  background: white;
  border-radius: 20px;
  border: 1px solid ${({ theme }) => theme.color.blackRussian};
  height: 50px;
  width: 100%;
  padding-left: 10px;
  padding-right: 10px;
`;

export const SearchInput = styled.TextInput.attrs({})`
  flex: 1;
  font-family: 'PoppinsRegular';
`;

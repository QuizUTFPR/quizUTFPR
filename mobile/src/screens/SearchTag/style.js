import styled from 'styled-components';
import Constants from 'expo-constants';
import Button from '@components/Button';

export const SafeArea = styled.View`
  margin-top: ${Constants.statusBarHeight + 10}px;
`;

export const StyledButton = styled(Button)`
  margin-top: 5px;
  height: 50px;
`;

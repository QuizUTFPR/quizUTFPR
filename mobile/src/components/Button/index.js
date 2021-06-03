import React from 'react';
import styled from 'styled-components/native';
import { Button } from 'react-native-paper';

const StyledButton = styled(Button).attrs({
  labelStyle: {
    color: 'white',
  },
})`
  height: 60px;
  display: flex;
  justify-content: center;
`;

const WrapperStyledButton = ({ children, ...props }) => (
  <StyledButton {...props}>{children}</StyledButton>
);

export default WrapperStyledButton;

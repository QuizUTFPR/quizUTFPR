import React from 'react';
import styled from 'styled-components';
import { Button } from '@material-ui/core';

const StyledButton = styled(Button)`
  height: 50px;
`;

const WrapperButton = ({ children, ...props }) => (
  <StyledButton {...props}>{children}</StyledButton>
);

export default WrapperButton;

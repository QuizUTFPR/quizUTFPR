import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import { Button } from '@material-ui/core';

const StyledButton = styled(Button)`
  height: 50px;
`;

const WrapperButton = ({ children, ...props }) => (
  <StyledButton {...props}>{children}</StyledButton>
);

WrapperButton.defaultProps = {};

WrapperButton.propTypes = {
  children: PropTypes.node.isRequired,
};

export default WrapperButton;

import React from 'react';
import PropTypes from 'prop-types';

import { StyledButton } from './style';

const WrapperButton = ({ children, ...props }) => (
  <StyledButton {...props}>{children}</StyledButton>
);

WrapperButton.defaultProps = {};

WrapperButton.propTypes = {
  children: PropTypes.node.isRequired,
};

export default WrapperButton;

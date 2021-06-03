import React from 'react';
import PropTypes from 'prop-types';
import { Container } from './style';

const WrapperContainer = ({ children }) => <Container>{children}</Container>;

WrapperContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default WrapperContainer;

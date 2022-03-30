import React from 'react';
import PropTypes from 'prop-types';
import { Container, Wrapper } from './style';

const WrapperContainer = ({ children, ...props }) => (
  <Container {...props}>
    <Wrapper>{children}</Wrapper>
  </Container>
);

WrapperContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default WrapperContainer;

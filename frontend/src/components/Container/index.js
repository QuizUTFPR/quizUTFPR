import React from 'react';
import PropTypes from 'prop-types';

import { GridContainer } from './style';

const Container = ({ children, ...props }) => (
  <GridContainer {...props}>{children}</GridContainer>
);

Container.defaultProps = {
  children: <></>,
};

Container.propTypes = {
  children: PropTypes.node,
};

export default Container;

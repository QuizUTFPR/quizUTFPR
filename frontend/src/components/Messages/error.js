import React from 'react';
import PropTypes from 'prop-types';

import { Error } from '@material-ui/icons/';
import { ErrorMessage, ErrorWrapper } from './style';

const ErrorComponent = ({ children, color, ...props }) => (
  <ErrorWrapper {...props}>
    <Error color="inherit" />
    <ErrorMessage>{children}</ErrorMessage>
  </ErrorWrapper>
);

ErrorComponent.defaultProps = {
  color: 'inherit',
  children: <></>,
};

ErrorComponent.propTypes = {
  children: PropTypes.node,
  color: PropTypes.string,
};
export default ErrorComponent;

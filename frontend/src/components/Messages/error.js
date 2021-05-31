import React from 'react';

import { Error } from '@material-ui/icons/';
import { ErrorMessage, ErrorWrapper } from './style';

const ErrorComponent = ({ children, ...props }) => (
  <ErrorWrapper {...props}>
    <Error color="inherit" />
    <ErrorMessage>{children}</ErrorMessage>
  </ErrorWrapper>
);

export default ErrorComponent;

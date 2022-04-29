import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@mui/material/CircularProgress';

import { StyledButton } from './style';

const WrapperButton = forwardRef((props, ref) => {
  const { children, loading, ...params } = props;

  return (
    <StyledButton disabled={loading} {...params} ref={ref}>
      {loading && (
        <CircularProgress
          style={{ marginRight: 20 }}
          size={30}
          thickness={4}
          color="inherit"
        />
      )}
      {children}
    </StyledButton>
  );
});

WrapperButton.defaultProps = {
  loading: true,
};

WrapperButton.propTypes = {
  children: PropTypes.node.isRequired,
  loading: PropTypes.bool,
};

export default WrapperButton;

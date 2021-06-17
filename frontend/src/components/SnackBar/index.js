import React, { forwardRef, useRef } from 'react';
import PropTypes from 'prop-types';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Slide from '@material-ui/core/Slide';

const Alert = forwardRef((props, ref) => (
  <MuiAlert ref={ref} elevation={6} variant="filled" {...props} />
));

const SlideTransition = forwardRef((props, ref) => (
  <Slide ref={ref} {...props} direction="right" />
));

const SnackBarWrapper = ({
  openSnackBar,
  handleCloseSnackBar,
  severity,
  autoHideDuration,
  variant,
  text,
  elevation,
  vertical,
  horizontal,
}) => {
  const snackRef = useRef(null);

  return (
    <Snackbar
      anchorOrigin={{ vertical, horizontal }}
      open={openSnackBar}
      autoHideDuration={autoHideDuration}
      onClose={handleCloseSnackBar}
      ref={snackRef}
      TransitionComponent={SlideTransition}
    >
      <Alert
        elevation={elevation}
        variant={variant}
        onClose={handleCloseSnackBar}
        severity={severity}
      >
        {text}
      </Alert>
    </Snackbar>
  );
};

SnackBarWrapper.defaultProps = {
  openSnackBar: false,
  handleCloseSnackBar: () => {},
  severity: 'success',
  variant: 'filled',
  autoHideDuration: 6000,
  elevation: 6,
  vertical: 'bottom',
  horizontal: 'left',
};
SnackBarWrapper.propTypes = {
  openSnackBar: PropTypes.bool,
  handleCloseSnackBar: PropTypes.func,
  severity: PropTypes.string,
  variant: PropTypes.string,
  autoHideDuration: PropTypes.number,
  text: PropTypes.string.isRequired,
  elevation: PropTypes.number,
  vertical: PropTypes.string,
  horizontal: PropTypes.string,
};

export default SnackBarWrapper;

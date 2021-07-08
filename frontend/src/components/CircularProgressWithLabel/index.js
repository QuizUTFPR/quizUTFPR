import React from 'react';
import PropTypes from 'prop-types';
import { CircularProgress, Typography, Box } from '@material-ui/core';

const CircularProgressWithLabel = ({ value, styleText, ...props }) => (
  <Box sx={{ position: 'relative', display: 'inline-flex' }}>
    <CircularProgress value={value} variant="determinate" {...props} />
    <Box
      sx={{
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography
        style={styleText}
        variant="caption"
        component="div"
        color="text.secondary"
      >
        {`${Math.round(value)}%`}
      </Typography>
    </Box>
  </Box>
);

CircularProgressWithLabel.defaultProps = {
  styleText: {},
};

CircularProgressWithLabel.propTypes = {
  value: PropTypes.number.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  styleText: PropTypes.object,
};

export default CircularProgressWithLabel;

import React from 'react';
import PropTypes from 'prop-types';
import { CircularProgress, Typography, Box } from '@material-ui/core';

const CircularProgressWithLabel = ({ value, ...props }) => (
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
      <Typography variant="caption" component="div" color="text.secondary">
        {`${Math.round(value)}%`}
      </Typography>
    </Box>
  </Box>
);

CircularProgressWithLabel.propTypes = {
  value: PropTypes.number.isRequired,
};

export default CircularProgressWithLabel;

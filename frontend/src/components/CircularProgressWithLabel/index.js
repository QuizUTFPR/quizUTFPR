import React from 'react';
import PropTypes from 'prop-types';
import { CircularProgress, Typography, Box } from '@mui/material';

const CircularProgressWithLabel = ({ value, styleText, ...props }) => {
  let color = 'success';
  if (value < 50) {
    color = 'inherit';
  } else if (value < 80) {
    color = 'yellow';
  }

  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress
        value={value}
        variant="determinate"
        color={color}
        {...props}
      />
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
};

CircularProgressWithLabel.defaultProps = {
  styleText: {},
};

CircularProgressWithLabel.propTypes = {
  value: PropTypes.number.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  styleText: PropTypes.object,
};

export default CircularProgressWithLabel;

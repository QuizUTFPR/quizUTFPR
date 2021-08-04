import React from 'react';

import { Tooltip } from '@material-ui/core';

const ToolTipComponent = ({ title, ariaLabel, children, ...props }) => (
  <Tooltip arrow aria-label={ariaLabel} title={title} {...props}>
    {children}
  </Tooltip>
);

export default ToolTipComponent;

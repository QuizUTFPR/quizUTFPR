import React from 'react';

import { Tooltip, Collapse } from '@material-ui/core';

const ToolTipComponent = ({ title, ariaLabel, children }) => (
  <Tooltip
    arrow
    aria-label={ariaLabel}
    title={title}
    TransitionComponent={Collapse}
  >
    {children}
  </Tooltip>
);

export default ToolTipComponent;

import React, { forwardRef } from 'react';

import GridContainer from '@components/Container';

const Wrapper = forwardRef((props, ref) => (
  <GridContainer ref={ref} {...props} />
));

export default Wrapper;

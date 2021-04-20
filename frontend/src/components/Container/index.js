import React from 'react'

import {GridContainer} from './style'

const Container = ({children, ...props}) => {
  return (
    <GridContainer {...props}>
      {children}
    </GridContainer>
  );
}

export default Container
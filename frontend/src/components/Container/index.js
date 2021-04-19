import React from 'react'

import {GridContainer} from './style'

const Container = ({children}) => {
  return (
    <GridContainer>
      {children}
    </GridContainer>
  );
}

export default Container
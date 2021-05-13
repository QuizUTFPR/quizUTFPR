import React from 'react'

import { 
  Typography, 
} from '@material-ui/core';

// COMPONENTS
import GridContainer from '@components/Container'
import DragZone from '@components/DragZone'

const Home = () => {

  return (
    <GridContainer container>
        <Typography color='primary'>Seja Bem-Vindo ao Painel de Control!</Typography>
        <Typography color='primary'>
          dawwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwafwfawf
          dawdawdawdawdwadwadwaddawwwwwwwwwwwwwwwwwwwwwwdd
        </Typography>
        <DragZone />
    </GridContainer>
  )
}


export default Home;
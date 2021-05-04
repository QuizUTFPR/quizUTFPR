import React, {forwardRef} from 'react'

import {IconButton, Grid, Typography, Divider } from '@material-ui/core'
import { Close } from '@material-ui/icons'

// COMPONENTS
import GridContainer from '@components/Container'


const Wrapper = forwardRef((props, ref) => (
  <GridContainer ref={ref} {...props} />
));

const TypeOfQuestion = forwardRef((props, ref) => {
  return(
      <Wrapper container spacing={3} >
        <Grid container justify='center' alignItems='center'>
          <Grid item xs={3} md={1}>
            <IconButton aria-label="closeModal" onClick={props.handleClose}>
              <Close />
            </IconButton >
          </Grid>
          <Grid item xs={9} md={11}>
            <Typography variant='h5' color='primary'>
              Qual tipo de questão deseja criar?
            </Typography>
          </Grid>
        </Grid>
  
  
        <Grid item><Divider /></Grid>

        <Grid container spacing={3} justify='center' style={{ overflow: 'scroll', height:'calc(100vh - 25px - 72px - 48px - 60px)' }}>
        <h1>teste</h1>
        </Grid>
      </Wrapper>
    )
  })


export default TypeOfQuestion;
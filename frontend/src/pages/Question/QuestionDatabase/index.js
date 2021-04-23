import React, {forwardRef} from 'react'

import {IconButton, Grid, Typography, Divider } from '@material-ui/core'
import { Close } from '@material-ui/icons'
import {StyledSearchTagButton} from './style'

// COMPONENTS
import GridContainer from '@components/Container'
import InputAutoComplete from '@components/AutoCompleteInput'

const Wrapper = forwardRef((props, ref) => (
  <GridContainer ref={ref} {...props} />
));

const QuestionDatabase = forwardRef((props, ref) => {
  
  return(
      <Wrapper container spacing={3}>
        <Grid container justify='center' alignItems='center'>
          <Grid item xs={3} md={1}>
            <IconButton aria-label="closeModal" onClick={props.handleClose}>
              <Close />
            </IconButton >
          </Grid>
          <Grid item xs={9} md={11}>
            <Typography variant='h5' color='primary'>
              Banco de Questões via Tag's
            </Typography>
          </Grid>
        </Grid>
  
        <Grid container justify='center' alignItems='center' spacing={2}>
          <Grid item xs={9}>
            <InputAutoComplete
              fullWidth
              stateValue={'tag'}
              suggestions={["aprenda", "ola"]}
              onChange={(e) => {console.log(e)}}
              variant='filled'
              label="Tag's"
              placeholder="Digite aqui as tag's"
            />
          </Grid>
          <Grid item xs={3}>
            <StyledSearchTagButton fullWidth color='primary' variant='contained'>Pesquisar</StyledSearchTagButton>
          </Grid>
        </Grid>
  
        <Grid item><Divider /></Grid>
      </Wrapper>
    )
  })


export default QuestionDatabase;
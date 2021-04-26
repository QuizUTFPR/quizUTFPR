import React, {forwardRef, useState} from 'react'

import {IconButton, Grid, Typography, Divider } from '@material-ui/core'
import { Close } from '@material-ui/icons'
import {StyledSearchTagButton} from './style'

// COMPONENTS
import GridContainer from '@components/Container'
import InputAutoComplete from '@components/AutoCompleteInput'
import Question from './question'

const Wrapper = forwardRef((props, ref) => (
  <GridContainer ref={ref} {...props} />
));

const QuestionDatabase = forwardRef((props, ref) => {
  
  const [checkboxes, setCheckboxes] = useState([]);

  const handleQuestionChecked = (id) => (e) => {
    setCheckboxes(prevState => ({
      ...prevState,
      [id]: e.target.checked
    }))
    console.log(checkboxes)
  }


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
              label="Tag"
              placeholder="Digite a Tag de questões que você deseja pesquisar..."
            />
          </Grid>
          <Grid item xs={3}>
            <StyledSearchTagButton fullWidth color='primary' variant='contained'>Pesquisar</StyledSearchTagButton>
          </Grid>
        </Grid>
  
        <Grid item><Divider /></Grid>

        <Question id={0} checked={checkboxes[0]} onChange={handleQuestionChecked} />
        <Question id={1} checked={checkboxes[1]} onChange={handleQuestionChecked} />
      </Wrapper>
    )
  })


export default QuestionDatabase;
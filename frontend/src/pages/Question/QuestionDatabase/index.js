import React, { useState } from 'react'

import {IconButton, Grid, Typography, Divider } from '@material-ui/core'
import { Close } from '@material-ui/icons'
import {StyledSearchTagButton} from './style'

// COMPONENTS
import GridContainer from '@components/Container'
import TagInput from '@components/ChipInput'

const QuestionDatabase = ({handleClose}) => {
  const [tagList, setTagList] = useState([]);

  return (
    <GridContainer container spacing={3}>
      
    <Grid container justify='center' alignItems='center'>
      <Grid item xs={3} md={1}>
        <IconButton aria-label="closeModal" onClick={handleClose}>
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
        <TagInput
          fullWidth
          valueFormik={tagList}
          suggestions={['aprenda']}
          onChange={(_, v) => setTagList(v)}
        />
      </Grid>
      <Grid item xs={3}>
        <StyledSearchTagButton fullWidth color='primary' variant='contained'>Pesquisar</StyledSearchTagButton>
      </Grid>
    </Grid>

    <Grid item><Divider /></Grid>
    </GridContainer>
  )
}

export default QuestionDatabase;
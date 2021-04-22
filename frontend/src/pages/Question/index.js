import React from 'react'

import { Grid } from '@material-ui/core'


import {
  StyledGrid,
  ContainerGrid,
  StyledAddQuestionButton,
  StyledFieldOfQuestion,
  StyledActionsButton
} from './style'

const Question = () => {
  return (
    <ContainerGrid container justify='space-between'>
      <Grid item xs={2}>
        <StyledGrid container>questoes</StyledGrid>
      </Grid>
      <Grid item xs={8}>
        <Grid container>
          <StyledAddQuestionButton container justify='space-around'>
            <Grid item xs={3} style={{'background': 'red'}}><p>Botao 1</p></Grid>
            <Grid item xs={3} style={{'background': 'red'}}><p>Botao 2</p></Grid>
          </StyledAddQuestionButton>
          <StyledFieldOfQuestion container>
            questão
          </StyledFieldOfQuestion>
          <StyledActionsButton container justify='space-around'>
            <Grid item xs={3} style={{'background': 'red'}}><p>Cancelar</p></Grid>
            <Grid item xs={3} style={{'background': 'red'}}><p>Finalizar</p></Grid>
          </StyledActionsButton>
        </Grid>
      </Grid>
      <Grid item xs={2}>
        <StyledGrid container>detalhes</StyledGrid>
      </Grid>
    </ContainerGrid>
  )
}

export default Question;
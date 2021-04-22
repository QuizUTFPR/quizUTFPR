import React from "react";

import { Grid, Typography, Button, Divider } from "@material-ui/core";

import {
  StyledGrid,
  ContainerGrid,
  StyledAddQuestionButton,
  StyledFieldOfQuestion,
  StyledActionsButton
} from "./style";

const Question = () => {
  return (
    <ContainerGrid container justify="space-between">
      <Grid item xs={2}>
        <StyledGrid container align="center" justify="center">
          <Typography color="primary" component="h5" variant="h5">
            Questões
          </Typography>
        </StyledGrid>
      </Grid>

      <Grid item xs={8}>
        <Grid container>
          <Grid container justify="space-around">
            <Grid item xs={3} align="center" justify="center">
              <Button fullwidth variant="contained" color="primary">
                CRIAR NOVA QUESTÃO
              </Button>
            </Grid>
            <Grid item xs={3}>
              <Button fullwidth variant="contained" color="primary">
                USAR QUESTÃO DO BANCO
              </Button>
            </Grid>
          </Grid>
          <StyledFieldOfQuestion container justify="center">
            <Typography>Título da Questão...</Typography>
          </StyledFieldOfQuestion>
          <Grid container justify="space-around">
            <Grid item xs={3} align="center" justify="center">
              <Button fullwidth variant="contained" color="secondary">
                CANCELAR
              </Button>
            </Grid>
            <Grid item xs={3} align="center" justify="center">
              <Button fullwidth variant="contained" color="primary">
                FINALIZAR
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={2}>
        <StyledGrid container align="center" justify="center">
          <Typography color="primary" component="h5" variant="h5">
            Detalhes
          </Typography>
        </StyledGrid>
      </Grid>
    </ContainerGrid>
  );
};

export default Question;

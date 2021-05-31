import React from 'react';
// ICONS
import { AddCircle } from '@material-ui/icons/';

// COMPONENTS
import { Grid, Typography } from '@material-ui/core';
import StyledButton from '@components/Button';
import {
  StyledLeftGrid,
  GridButtonNewQuestion,
  CardSelectQuestion,
  GridQuestions,
} from '../style';

const LeftSide = ({
  questions,
  questionOnScreen,
  handleOpenModalTypeQuestion,
  handleChangeQuestion,
}) => (
  <Grid item xs={2}>
    <StyledLeftGrid container align="center">
      <Grid item xs={12}>
        <Typography color="primary" component="h5" variant="h5">
          Questões
        </Typography>
      </Grid>

      <GridQuestions container spacing={1}>
        {questions.map((item, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <Grid item xs={12} key={index}>
            <CardSelectQuestion
              isonscreen={index === questionOnScreen.index ? 'true' : 'false'}
              color="primary"
              variant="outlined"
              fullWidth
              onClick={handleChangeQuestion(item, index)}
            >
              {item.title ? item.title : 'Sem Título'}
            </CardSelectQuestion>
          </Grid>
        ))}
      </GridQuestions>

      <GridButtonNewQuestion item xs={12}>
        <StyledButton
          onClick={handleOpenModalTypeQuestion}
          fullWidth
          variant="contained"
          color="secondary"
          startIcon={<AddCircle />}
          size="large"
        >
          CRIAR NOVA QUESTÃO
        </StyledButton>
      </GridButtonNewQuestion>
    </StyledLeftGrid>
  </Grid>
);

export default LeftSide;

import React from 'react'
import styled from 'styled-components'

import {
  Card,
  CardContent,
  Typography,
  // CardActions ,
  // Button,
  Divider,
  Grid
} from '@material-ui/core';

const defaultMargin = '10px';

const Answer = styled(Typography)`
  padding: 10px;
  border-radius: 5px;
`

const WrongAnswer = styled(Answer)`
  background: red;
`

const CorrectgAnswer = styled(Answer)`
  background: green;
`

const TitleQuestion = styled(Typography)`
  margin-top: ${defaultMargin};
  margin-bottom: ${defaultMargin};
  font-weight: bolder;
`

const Questions = () => {
  return (
    <Card  variant="outlined">
      <CardContent>
        <Grid container justify='space-between'>
          <Grid item>
            <Typography color="textSecondary" gutterBottom>Multípla Escolha</Typography>
          </Grid>
          <Grid item>
            <Typography color="textSecondary" gutterBottom>Fácil</Typography>
          </Grid>
        </Grid>
        <Divider />
        <TitleQuestion variant="h5" component="h2" color='primary'>
          Título da Questão
        </TitleQuestion>
        <Typography  color="textSecondary">
          Alternativas
        </Typography>
        <Grid container spacing={1}>
          <Grid item xs={12} md={6}><WrongAnswer>Alternativa Errada</WrongAnswer></Grid>
          <Grid item xs={12} md={6}><CorrectgAnswer>Alternativa Correta</CorrectgAnswer></Grid>
          <Grid item xs={12} md={6}><WrongAnswer>Alternativa Errada</WrongAnswer></Grid>
          <Grid item xs={12} md={6}><WrongAnswer>Alternativa Errada</WrongAnswer></Grid>
        </Grid>
      </CardContent>
      {/* <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions> */}
    </Card>
  );
}

export default Questions;
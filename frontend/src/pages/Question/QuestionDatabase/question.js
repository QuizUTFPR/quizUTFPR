import React from 'react'

import {
  Card,
  CardContent,
  Typography,
  CardActions ,
  Button,
  Divider,
  Grid
} from '@material-ui/core';


const Questions = () => {
  return (
    <Card  variant="outlined">
      <CardContent>
        <Grid container>
          <Typography color="textSecondary" gutterBottom>Multípla Escolha</Typography>
        </Grid>
        <Divider />
        <Typography variant="h5" component="h2" color='primary'>
          Título da Questão
        </Typography>
        <Typography  color="textSecondary">
          Alternativas
        </Typography>
        <Typography variant="body2" component="p">
          colocar grid aqui com questões
        </Typography>
      </CardContent>
      {/* <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions> */}
    </Card>
  );
}

export default Questions;
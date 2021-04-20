import React from "react";
import { useFormik} from 'formik';
import {TextField} from '@material-ui/core'

// COMPONENTS
import GridContainer from "@components/Container";

//STYLE

// MATERIAL-UI COMPONENTS
import { Grid, Button, Typography, Divider } from "@material-ui/core";

// MATERIAL-UI ICONS

const CriarQuiz = () => {

  const formik = useFormik({
    initialValues: {
      title: ''
    },
    onSubmit: (values) => {
      console.log(values);
    }

  })

  return (
    <GridContainer container spacing={3}>
      <Grid container align="center" justify="center">
        <Typography color="primary" component="h4" variant="h4">
          Informações do Quiz
        </Typography>
      </Grid>

      <Grid item>
        <Divider  />
      </Grid>

      
      <form onSubmit={formik.handleSubmit}>
        <TextField
          label="Título"
          name="title"
          variant='outlined'
          value={formik.values.title}
          onChange={formik.handleChange}
          required
        />

        <Button variant="contained" color="primary" type="submit">
          AVANÇAR
        </Button>
      </form>



     
    </GridContainer>
  );
};

export default CriarQuiz;

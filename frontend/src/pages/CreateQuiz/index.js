import React from "react";
import { Formik, Form, Field } from 'formik';
import { TextField, SimpleFileUpload  } from 'formik-material-ui';


// COMPONENTS
import GridContainer from "@components/Container";

//STYLE

// MATERIAL-UI COMPONENTS
import { Grid, Button, Typography, Divider, MenuItem } from "@material-ui/core";

// MATERIAL-UI ICONS

const CriarQuiz = () => {

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

      <Formik
        initialValues={{
          title: '',
          description: '',
          visibility: ''
        }}
      
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(false);
          alert(JSON.stringify(values, null, 2));
        }}
      >
      {({ submitForm, isSubmitting }) => (
        <Form>
         <Field
            component={TextField}
            label="Título"
            inputProps={{
              type: "text"
            }}
            name="title"
            variant='outlined'
            required
          />

          <Field
            component={TextField}
            label="Descrição"
            name="description"
            variant='outlined'
            inputProps={{
              type: "text"
            }}
            required
            multiline
            rows={10}
          />
          
          <Field
            component={TextField}
            name="visibility"
            variant='outlined'
            label="Vísibilidade"
            inputProps={{
              id: 'visibility',
            }}
            required
            defaultValue={'public'}
            select
            autoWidth
          >
            <MenuItem value={'public'}>Público</MenuItem>
            <MenuItem value={'other'}>Outros</MenuItem>
          </Field>
          
          <Field 
            component={SimpleFileUpload} 
            name="file" 
            label="Imagem de Capa"
          />

          <Button
            variant="contained"
            color="primary"
            disabled={isSubmitting}
            onClick={submitForm}
          >
            AVANÇAR
          </Button>
        </Form>
      )}
    </Formik>

     
    </GridContainer>
  );
};

export default CriarQuiz;

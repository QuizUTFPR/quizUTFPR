import React from "react";
import { useFormik } from "formik";
import { TextField } from "@material-ui/core";

// COMPONENTS
import GridContainer from "@components/Container";
import ChipInput from "@components/ChipInput";

// MATERIAL-UI COMPONENTS
import { Grid, Button, Typography, Divider, MenuItem } from "@material-ui/core";

// MATERIAL-UI ICONS

const CriarQuiz = () => {

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      visibility: "public",
      tags: ['UTFPR', 'QUIZ']
    },
    onSubmit: values => {
      console.log(values);
    }
  });

  return (
    <GridContainer container spacing={3}>
      <Grid container align="center" justify="center">
        <Typography color="primary" component="h4" variant="h4">
          Informações do Quiz
        </Typography>
      </Grid>

      <Grid item>
        <Divider />
      </Grid>

      <form onSubmit={formik.handleSubmit}>
        <TextField
          label="Título"
          id="title"
          variant="filled"
          value={formik.values.title}
          onChange={formik.handleChange}
          required
        />

        <TextField
          label="Descrição"
          id="description"
          variant="filled"
          value={formik.values.description}
          onChange={formik.handleChange}
          required
          multiline
          row={5}
          rowsMax={5}
        />

        <TextField
          label="Visibilidade"
          id="visibility"
          variant="filled"
          value={formik.values.visibility}
          onChange={formik.handleChange}
          required
          select
        >
          <MenuItem value="public">Público</MenuItem>
          <MenuItem value="other">Outros</MenuItem>
        </TextField>

        <ChipInput
          valueFormik={formik.values.tags}
          suggestions={['Aprenda', 'JavaScript']}
          onChange={(_, value) => formik.setFieldValue('tags', value)}
        />

        <Button variant="contained" color="primary" type="submit">
          AVANÇAR
        </Button>
      </form>
    </GridContainer>
  );
};

export default CriarQuiz;

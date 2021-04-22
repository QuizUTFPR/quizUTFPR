import React from "react";
import { useFormik } from "formik";

// COMPONENTS
import GridContainer from "@components/Container";
import ChipInput from "@components/ChipInput";

// MATERIAL-UI COMPONENTS
import {
  Grid,
  Button,
  Typography,
  Divider,
  MenuItem,
  TextField
} from "@material-ui/core";

// MATERIAL-UI ICONS

const CriarQuiz = () => {
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      visibility: "public",
      file: "",
      tags: ["UTFPR", "QUIZ"]
    },
    onSubmit: values => {
      alert(JSON.stringify(values, null, 1));
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

      <Grid
        container
        component="form"
        justify="center"
        align="center"
        onSubmit={formik.handleSubmit}
        spacing={2}
      >
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Título"
            id="title"
            variant="filled"
            value={formik.values.title}
            onChange={formik.handleChange}
            required
            autoFocus
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            fullWidth
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
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Descrição"
            id="description"
            variant="filled"
            value={formik.values.description}
            onChange={formik.handleChange}
            required
            multiline
            rows={5}
            rowsMax={5}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            type="file"
            name="Imagem de Capa"
            id="file"
            onChange={event => {
              formik.setFieldValue("file", event.currentTarget.files[0].name);
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <ChipInput
            fullWidth
            valueFormik={formik.values.tags}
            suggestions={["Aprenda", "JavaScript"]}
            onChange={(_, value) => formik.setFieldValue("tags", value)}
          />
        </Grid>

        <Grid item xs={6}>
          <Button fullWidth variant="contained" color="primary" type="submit">
            CRIAR
          </Button>
        </Grid>
      </Grid>
    </GridContainer>
  );
};

export default CriarQuiz;

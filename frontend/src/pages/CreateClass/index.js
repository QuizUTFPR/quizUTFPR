import React from 'react';
// import { useNavigate } from 'react-router-dom';

import { useFormik } from 'formik';
// import api from '@api';

// ROTAS
// import { QUESTION } from '@routes';

// UTILS
// import getBase64 from '@utils/getBase64OfImage';

// COMPONENTS
import GridContainer from '@components/Container';
import Button from '@components/Button';

import DragImageInput from '@components/DragZone';
import { Grid, Typography, Divider, TextField } from '@mui/material';
import { PreviewImage } from './style';

const CriarQuiz = () => {
  // const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      visibility: 'public',
      imageObj: null,
      imageUrl: '',
      published: false,
      noTime: false,
    },
    onSubmit: async (values) => {
      console.log(values);
    },
  });

  return (
    <GridContainer container spacing={3}>
      <Grid container align="center" justifyContent="center">
        <Typography color="primary" component="h4" variant="h4">
          Criação de Turmas
        </Typography>
      </Grid>

      <Grid item>
        <Divider />
      </Grid>

      <Grid
        container
        component="form"
        justifyContent="center"
        align="center"
        onSubmit={formik.handleSubmit}
        spacing={2}
      >
        <Grid item xs={12}>
          <PreviewImage src={formik.values.imageUrl} />
        </Grid>
        <Grid item xs={12}>
          <DragImageInput
            handleChange={(files) => {
              formik.setFieldValue('imageObj', files[0]);
              formik.setFieldValue('imageUrl', URL.createObjectURL(files[0]));
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Nome da Turma"
            id="title"
            variant="outlined"
            value={formik.values.title}
            onChange={formik.handleChange}
            required
            autoFocus
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Descrição"
            id="description"
            variant="outlined"
            value={formik.values.description}
            onChange={formik.handleChange}
            required
            multiline
            minRows={5}
            maxRows={5}
          />
        </Grid>

        <Grid item xs={6}>
          <Button fullWidth variant="contained" color="primary" type="submit">
            CRIAR QUIZ
          </Button>
        </Grid>
      </Grid>
    </GridContainer>
  );
};

export default CriarQuiz;

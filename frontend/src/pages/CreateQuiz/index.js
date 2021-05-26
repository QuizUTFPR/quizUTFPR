import React from 'react';
import { useFormik } from 'formik';
import api from '@api';

// ROTAS
import { QUIZ } from '@routes';

// COMPONENTS
import GridContainer from '@components/Container';
import ChipInput from '@components/ChipInput';
import DragImageInput from '@components/DragZone';
import {
  Grid,
  Button,
  Typography,
  Divider,
  MenuItem,
  TextField,
} from '@material-ui/core';
import { PreviewImage } from './style';

const CriarQuiz = ({ history }) => {
  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      visibility: 'public',
      imageObj: null,
      imageUrl: '',
      tags: ['UTFPR', 'QUIZ'],
    },
    onSubmit: async (values) => {
      let responseFile = null;

      if (values.imageObj !== null) {
        const file = new FormData();
        file.append('file', values.imageObj);

        responseFile = await api.post('/files', file);
      }

      const quiz = {
        title: values.title,
        tags: values.tags,
        description: values.description,
        visibility: values.visibility,
      };

      if (responseFile) {
        quiz.id_image = responseFile.data.id;
      }

      const responseQuiz = await api.post('/quiz/create', quiz);

      if (responseQuiz.status === 200) {
        history.push(QUIZ);
      }
    },
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
            name="visibility"
            variant="filled"
            value={formik.values.visibility}
            onChange={(event) =>
              formik.setFieldValue('visibility', event.target.value)
            }
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
          <ChipInput
            fullWidth
            value={formik.values.tags}
            suggestions={['Aprenda', 'JavaScript']}
            onChange={(_, value) => formik.setFieldValue('tags', value)}
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

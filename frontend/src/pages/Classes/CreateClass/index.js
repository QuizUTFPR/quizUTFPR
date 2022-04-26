import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useFormik } from 'formik';
import api from '@api';

// ROTAS
import { MANAGE_CLASSES } from '@routes';

// UTILS
// import getBase64 from '@utils/getBase64OfImage';

// COMPONENTS
import GridContainer from '@components/Container';
import Button from '@components/Button';

import DragImageInput from '@components/DragZoneImageOrSearch';
import { Grid, Typography, Divider, TextField, MenuItem } from '@mui/material';
import { PreviewImage } from './style';

const CriarQuiz = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      imageObj: null,
      imageUrl: '',
      visibility: 'private',
    },
    onSubmit: async (values) => {
      setLoading(true);
      const { title, description, imageObj, visibility } = values;

      const body = { title, description, visibility };

      const file = new FormData();
      file.append('file', imageObj);
      file.append('values', JSON.stringify(body));

      const { data, status } = await api.post('/class/create', file);

      setLoading(false);
      if (status === 200) {
        navigate(`${MANAGE_CLASSES}/${data.id}`, {
          state: { title: data.title },
        });
      }
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

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Visibilidade"
            id="visibility"
            name="visibility"
            variant="outlined"
            value={formik.values.visibility}
            onChange={(event) =>
              formik.setFieldValue('visibility', event.target.value)
            }
            required
            select
          >
            <MenuItem value="private">Privada</MenuItem>
            <MenuItem value="public">Pública</MenuItem>
          </TextField>
        </Grid>

        <Grid item xs={6}>
          <Button
            loading={loading}
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
          >
            CRIAR TURMA
          </Button>
        </Grid>
      </Grid>
    </GridContainer>
  );
};

export default CriarQuiz;

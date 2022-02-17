import React from 'react';
import { useFormik } from 'formik';
import api from '@api';

// COMPONENTS
import Button from '@components/Button';
import DragImageInput from '@components/DragZone';
import {
  IconButton,
  Grid,
  Typography,
  Divider,
  TextField,
} from '@mui/material';

// ASSETS
import { Close } from '@mui/icons-material';

// STYLE
import { PreviewImage, FormWrapper, GridContainerModal } from './style';

const EditPreferences = ({ handleClose, classObj }) => {
  const formik = useFormik({
    initialValues: {
      id: classObj.id,
      title: classObj.title,
      description: classObj.description,
      imageUrl: classObj?.imageClass?.url,
      imageObj: null,
    },
    onSubmit: async (values) => {
      const { id, imageObj, title, tags, description } = values;

      const body = { id, title, tags, description };

      const file = new FormData();
      file.append('file', imageObj);
      file.append('values', JSON.stringify(body));

      const responseQuiz = await api.put('/class/update', file);
      if (responseQuiz.status === 200) handleClose();
    },
  });

  return (
    <GridContainerModal
      container
      spacing={3}
      style={{
        maxHeight: '90vh',
        flexWrap: 'nowrap',
        overflow: 'auto',
      }}
    >
      <Grid container justifyContent="center" alignItems="center">
        <Grid item xs={3} md={1}>
          <IconButton aria-label="closeModal" onClick={handleClose}>
            <Close />
          </IconButton>
        </Grid>

        <Grid item xs={9} md={11}>
          <Typography variant="h5" color="primary">
            Preferências da Turma
          </Typography>
        </Grid>
      </Grid>

      <Grid item style={{ marginBottom: '10px' }}>
        <Divider />
      </Grid>

      <FormWrapper
        container
        component="form"
        onSubmit={formik.handleSubmit}
        spacing={2}
      >
        {formik.values.imageUrl && (
          <Grid item xs={6} style={{ display: 'flex' }}>
            <PreviewImage src={formik.values.imageUrl} />
          </Grid>
        )}
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
            label="Título"
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
          <Button fullWidth variant="contained" color="primary" type="submit">
            SALVAR ALTERAÇÔES
          </Button>
        </Grid>
      </FormWrapper>
    </GridContainerModal>
  );
};

export default EditPreferences;

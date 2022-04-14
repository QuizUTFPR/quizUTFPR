import React, { forwardRef } from 'react';
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
  MenuItem,
} from '@mui/material';

// ASSETS
import { Close } from '@mui/icons-material';

// STYLE
import { PreviewImage, FormWrapper, GridContainerModal } from './style';

const CloneClass = forwardRef((props, _) => {
  const { handleClose, classObj } = props;

  const formik = useFormik({
    initialValues: {
      idClass: classObj.id,
      title: '',
      description: '',
      imageUrl: '',
      visibility: 'private',
      imageObj: null,
    },
    onSubmit: async (values) => {
      const { idClass, imageObj, title, tags, description, visibility } =
        values;

      const body = { idClass, title, tags, description, visibility };

      const file = new FormData();
      file.append('file', imageObj);
      file.append('values', JSON.stringify(body));

      const clonedClass = await api.post('/class/cloneClass', file);
      if (clonedClass.status === 200) handleClose();
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
            Preencha as informações para Clonar Turma
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
            label="Novo Título"
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
            label="Nova Descrição"
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
            label="Nova Visibilidade"
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

        <Grid item xs={12}>
          <Button fullWidth variant="contained" color="primary" type="submit">
            SALVAR CLONE
          </Button>
        </Grid>
      </FormWrapper>
    </GridContainerModal>
  );
});

export default CloneClass;

import React, { forwardRef } from 'react';
import { useFormik } from 'formik';
import api from '@api';

// COMPONENTS
import Button from '@components/Button';
import ChipInput from '@components/ChipInput';
import DragImageInput from '@components/DragZone';
import {
  IconButton,
  Grid,
  Typography,
  Divider,
  TextField,
  MenuItem,
} from '@material-ui/core';

// ASSETS
// import SaveIcon from '@material-ui/icons/Save';
import { Close } from '@material-ui/icons';
import { PreviewImage, FormWrapper, GridContainerModal } from './style';

const Wrapper = forwardRef((props, ref) => (
  <GridContainerModal
    style={{
      maxHeight: '90vh',
      flexWrap: 'nowrap',
      overflow: 'auto',
    }}
    ref={ref}
    {...props}
  />
));

// eslint-disable-next-line no-unused-vars
const EditPreferences = forwardRef((props, ref) => {
  const { quiz } = props;

  const formik = useFormik({
    initialValues: {
      id: quiz.id,
      title: quiz.title,
      description: quiz.description,
      visibility: quiz.visibility,
      imageObj: null,
      imageUrl: quiz.image_quiz ? quiz.image_quiz.url : '',
      tags: quiz.tags_quiz.map((tag) => tag.name),
    },
    onSubmit: async (values) => {
      let responseFile = null;

      if (values.imageObj !== null) {
        const file = new FormData();
        file.append('file', values.imageObj);

        responseFile = await api.post('/files', file);
      }

      const quizUpdated = {
        id: values.id,
        title: values.title,
        tags: values.tags,
        description: values.description,
        visibility: values.visibility,
      };

      if (responseFile) {
        quizUpdated.id_image = responseFile.data.id;
      }

      const responseQuiz = await api.put('/quiz/update', quizUpdated);
      if (responseQuiz.status === 200) props.handleClose();
    },
  });
  return (
    <Wrapper container spacing={3}>
      <Grid container justify="center" alignItems="center">
        <Grid item xs={3} md={1}>
          <IconButton aria-label="closeModal" onClick={props.handleClose}>
            <Close />
          </IconButton>
        </Grid>

        <Grid item xs={9} md={11}>
          <Typography variant="h5" color="primary">
            Preferências do Quiz
          </Typography>
        </Grid>
      </Grid>

      <Grid item>
        <Divider />
      </Grid>

      <FormWrapper
        container
        component="form"
        onSubmit={formik.handleSubmit}
        spacing={2}
      >
        <Grid item xs={6} style={{ display: 'flex' }}>
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
            variant="outlined"
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
            variant="outlined"
            value={formik.values.visibility}
            onChange={(event) =>
              formik.setFieldValue('visibility', event.target.value)
            }
            required
            select
          >
            <MenuItem value="public">Público</MenuItem>
            <MenuItem value="private">Privado</MenuItem>
          </TextField>
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

        <Grid item xs={12}>
          <Button fullWidth variant="contained" color="primary" type="submit">
            SALVAR ALTERAÇÔES
          </Button>
        </Grid>
      </FormWrapper>
    </Wrapper>
  );
});

export default EditPreferences;

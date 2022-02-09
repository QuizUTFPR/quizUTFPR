import React, { forwardRef } from 'react';
import { useFormik } from 'formik';
import api from '@api';

// UTILS
// import getBase64 from '@utils/getBase64OfImage';

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
  FormControlLabel,
  Checkbox,
} from '@mui/material';

// ASSETS
// import SaveIcon from '@mui/icons-material/Save';
import { Close } from '@mui/icons-material';
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
      imageUrl: quiz.image?.url,
      imageObj: null,
      // imageBase64: quiz.image?.url,
      tags: quiz.tagsQuiz.map((tag) => tag.name),
      noTime: quiz.noTime,
    },
    onSubmit: async (values) => {
      // const responseFile = null;
      // let base64 = '';

      // if (values.imageObj !== null) {
      //   base64 = await getBase64(values.imageObj);

      //   // const file = new FormData();
      //   // file.append('file', values.imageObj);
      //   // responseFile = await api.post('/files', file);
      // }

      const { id, imageObj, title, tags, description, visibility, noTime } =
        values;

      const body = { id, title, tags, description, visibility, noTime };

      const file = new FormData();
      file.append('file', imageObj);
      file.append('values', JSON.stringify(body));

      // if (responseFile) {
      //   quizUpdated.id_image = responseFile.data.id;
      // }

      const responseQuiz = await api.put('/quiz/update', file);
      if (responseQuiz.status === 200) props.handleClose();
    },
  });

  return (
    <Wrapper container spacing={3}>
      <Grid container justifyContent="center" alignItems="center">
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

        <Grid item xs={3}>
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

        <Grid item xs={3}>
          <FormControlLabel
            label="Sem limite de tempo"
            control={
              <Checkbox
                id="noTime"
                name="noTime"
                variant="outlined"
                checked={formik.values.noTime}
                onChange={(event) =>
                  formik.setFieldValue('noTime', event.target.checked)
                }
              />
            }
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

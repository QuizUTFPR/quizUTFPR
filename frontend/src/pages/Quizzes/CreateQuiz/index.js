import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useFormik } from 'formik';
import api from '@api';

// ROTAS
import { QUESTION } from '@routes';

// UTILS
// import getBase64 from '@utils/getBase64OfImage';

// COMPONENTS
import GridContainer from '@components/Container';
import ChipInput from '@components/ChipInput';
import Button from '@components/Button';

import DragImageInput from '@components/DragZoneImageOrSearch';
import {
  Grid,
  Typography,
  Divider,
  MenuItem,
  TextField,
  Checkbox,
  FormControlLabel,
  Tooltip,
} from '@mui/material';
import { PreviewImage } from './style';

const CriarQuiz = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [tagSuggestions, setTagSuggestions] = useState([]);

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      visibility: 'public',
      imageObj: null,
      imageUrl: '',
      tags: ['utfpr', 'quiz'],
      published: false,
      noTime: false,
    },
    onSubmit: async (values) => {
      setLoading(true);
      const {
        imageObj,
        title,
        tags,
        description,
        visibility,
        published,
        noTime,
      } = values;

      const body = { title, tags, description, visibility, published, noTime };

      const file = new FormData();
      file.append('file', imageObj);
      file.append('values', JSON.stringify(body));

      const responseQuiz = await api.post('/teacherQuiz/create', file);
      const { data } = responseQuiz;

      setLoading(false);

      if (responseQuiz.status === 200) {
        navigate(`${QUESTION}${data.id}`, {
          state: { title: data.title, noTime: data.noTime },
        });
      }
    },
  });

  useEffect(() => {
    const getTags = async () => {
      try {
        const response = await api.get('/teacherTag');
        if (response.data) {
          const newSuggestions = response.data.map((tag) => tag.name);
          setTagSuggestions(newSuggestions);
        }
      } catch (error) {
        setTagSuggestions([]);
      }
    };

    getTags();
  }, []);

  return (
    <GridContainer container spacing={3}>
      <Grid container align="center" justifyContent="center">
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
          <Tooltip
            title="Cada pergunta possui um tempo para o aluno responder.
           Ativando essa opção as questões do quiz não teram tempo para serem respondidas."
          >
            <FormControlLabel
              label="Desabilitar limite de tempo para respostas."
              control={
                <Checkbox
                  id="noTime"
                  name="noTime"
                  variant="outlined"
                  value={formik.values.noTime}
                  onChange={(event) =>
                    formik.setFieldValue('noTime', event.target.checked)
                  }
                />
              }
            />
          </Tooltip>
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
            suggestions={tagSuggestions}
            onChange={(_, value) => {
              formik.setFieldValue('tags', [
                ...new Set(
                  value.map((element) => element.toLowerCase().trim())
                ),
              ]);
            }}
          />
        </Grid>

        <Grid item xs={6}>
          <Button
            loading={loading}
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
          >
            CRIAR QUIZ
          </Button>
        </Grid>
      </Grid>
    </GridContainer>
  );
};

export default CriarQuiz;

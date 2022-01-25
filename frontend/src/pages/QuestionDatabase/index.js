/* eslint-disable camelcase */
import React, { forwardRef, useState, useEffect } from 'react';
import { useFormik } from 'formik';
import api from '@api';

// COMPONENTS
import GridContainer from '@components/Container';
import TagInput from '@components/ChipInput';
import {
  IconButton,
  Grid,
  Typography,
  Divider,
  CircularProgress,
} from '@mui/material';
import { Close, Search } from '@mui/icons-material';
import SnackBar from '@components/SnackBar';
import Question from './question';

// ICONS
import { StyledSearchTagButton } from './style';

const Wrapper = forwardRef((props, ref) => (
  <GridContainer ref={ref} {...props} />
));

// async function getFileFromUrl(url, name, defaultType = 'image/jpeg') {
//   const response = await fetch(url);
//   const data = await response.blob();
//   return new File([data], name, {
//     type: response.headers.get('content-type') || defaultType,
//   });
// }

// eslint-disable-next-line no-unused-vars
const QuestionDatabase = forwardRef((props, ref) => {
  const [isLoading, setLoading] = useState(false);
  const [checkboxes, setCheckboxes] = useState([]);

  const initialState = {
    tag: [],
    questions: [],
    suggestions: [],
  };

  const [stateSnackBar, setStateSnackBar] = useState({
    open: false,
    text: '',
    severity: '',
    autoHideDuration: 1000,
  });

  const handleCloseSnackBar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setStateSnackBar((prevState) => ({ ...prevState, open: false }));
  };

  const handleClickSnackBar = (
    text,
    severity,
    checked = false,
    autoHideDuration = 1000
  ) => {
    if (!checked) {
      setTimeout(() => {
        setStateSnackBar({ text, open: true, severity, autoHideDuration });
      }, 250);
    } else {
      setStateSnackBar({ text, open: true, severity, autoHideDuration });
    }
  };

  const formik = useFormik({
    initialValues: initialState,
    onSubmit: async ({ tag }) => {
      try {
        setLoading(true);
        const { data } = await api.post(`question/getFromTags`, tag);

        if (data) {
          const newQuestions = await Promise.all(
            data.map(
              async ({
                tags_question,
                image_question,
                difficulty_level,
                answer,
                image_base64,
                ...rest
              }) => ({
                ...rest,
                copy: true,
                id: -1,
                difficultyLevel: difficulty_level,
                availableOnQuestionsDB: false,
                imageObj: null,
                // imageObj:
                //   image_question &&
                //   (await getFileFromUrl(
                //     image_question.url,
                //     image_question.name
                //   )),
                // imageUrl: image_question ? image_question.url : '',
                imageBase64: image_base64,
                tags: tags_question.map((item) => item.name),
                answer: answer.map((item) => ({ ...item, id: -1 })),
              })
            )
          );
          formik.setFieldValue('questions', newQuestions);
        } else {
          formik.setFieldValue('questions', []);
        }
      } catch (error) {
        handleClickSnackBar(error.response.data.error, 'error');
      }
      setLoading(false);
    },
  });

  useEffect(() => {
    const getTags = async () => {
      try {
        const response = await api.get('/tag/question');
        if (response.data) {
          const newSuggestions = response.data.map((tag) => tag.name);
          formik.setFieldValue('suggestions', newSuggestions);
        } else {
          handleClickSnackBar(
            'Não existe nenhuma tag com questões cadastrada.',
            'warning',
            false,
            2000
          );
        }
      } catch (error) {
        handleClickSnackBar(error.response.data.error, 'error');
      }
    };

    getTags();
  }, []);

  const handleQuestionChecked = (question) => (e) => {
    setCheckboxes((prevState) => ({
      ...prevState,
      [question.title]: e.target.checked,
    }));

    if (e.target.checked) {
      props.handleaddQuestion(question);
    } else {
      props.handleRemoveQuestion(question);
    }
  };

  return (
    <>
      <Wrapper container spacing={3}>
        <Grid container justifyContent="center" alignItems="center">
          <Grid item xs={3} md={1}>
            <IconButton aria-label="closeModal" onClick={props.handleClose}>
              <Close />
            </IconButton>
          </Grid>
          <Grid item xs={9} md={11}>
            <Typography variant="h5" color="primary">
              Banco de Questões via Tag‘s
            </Typography>
          </Grid>
        </Grid>

        <Grid
          component="form"
          onSubmit={formik.handleSubmit}
          container
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <Grid item xs={9}>
            <TagInput
              fullWidth
              id="tag"
              value={formik.values.tag}
              suggestions={formik.values.suggestions}
              onChange={(e, value) => formik.setFieldValue('tag', value)}
              variant="outlined"
              label="Tag"
              placeholder="Digite a Tag de questões que você deseja pesquisar..."
            />
          </Grid>
          <Grid item xs={3}>
            <StyledSearchTagButton
              startIcon={<Search />}
              fullWidth
              type="submit"
              color="primary"
              variant="contained"
            >
              Pesquisar
            </StyledSearchTagButton>
          </Grid>
        </Grid>
        {!!formik.values.questions.length && (
          <Grid item>
            <Divider />
          </Grid>
        )}

        {isLoading && (
          <Grid item style={{ alignSelf: 'center' }}>
            <CircularProgress disableShrink />
          </Grid>
        )}

        <Grid
          container
          spacing={3}
          justifyContent="center"
          style={{
            overflow: 'auto',
            minHeight: '40px',
            maxHeight: 'calc(100vh - 25px - 72px - 48px - 60px)',
          }}
        >
          {formik.values.questions.map((question, index) => (
            <Grid
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              item
              xs={12}
              onClick={() =>
                handleClickSnackBar(
                  'Questão adicionada com sucesso!',
                  'success',
                  checkboxes[question.title]
                )
              }
            >
              <Question
                question={question}
                id={question.title}
                checked={checkboxes[question.title]}
                onChange={() => handleQuestionChecked(question)}
              />
            </Grid>
          ))}
        </Grid>
      </Wrapper>

      <SnackBar
        openSnackBar={stateSnackBar.open}
        handleCloseSnackBar={handleCloseSnackBar}
        autoHideDuration={stateSnackBar.autoHideDuration}
        text={stateSnackBar.text}
        severity={stateSnackBar.severity}
      />
    </>
  );
});

export default QuestionDatabase;

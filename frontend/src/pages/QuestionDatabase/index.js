/* eslint-disable camelcase */
import React, { forwardRef, useState, useEffect } from 'react';
import { useFormik } from 'formik';
import api from '@api';

// COMPONENTS
import GridContainer from '@components/Container';
import TagInput from '@components/ChipInput';
import { IconButton, Grid, Typography, Divider } from '@material-ui/core';
import { Close, Search } from '@material-ui/icons';
import SnackBar from '@components/SnackBar';
import Question from './question';

// ICONS
import { StyledSearchTagButton } from './style';

const Wrapper = forwardRef((props, ref) => (
  <GridContainer ref={ref} {...props} />
));

async function getFileFromUrl(url, name, defaultType = 'image/jpeg') {
  const response = await fetch(url);
  const data = await response.blob();
  return new File([data], name, {
    type: response.headers.get('content-type') || defaultType,
  });
}

// eslint-disable-next-line no-unused-vars
const QuestionDatabase = forwardRef((props, ref) => {
  const [checkboxes, setCheckboxes] = useState([]);

  const initialState = {
    tag: [],
    questions: [],
    suggestions: [],
  };

  const formik = useFormik({
    initialValues: initialState,
    onSubmit: async ({ tag }) => {
      const { data } = await api.post(`question/getFromTags`, tag);
      console.log(data);
      if (data) {
        const newQuestions = await Promise.all(
          data.map(
            async ({
              tags_question,
              image_question,
              difficulty_level,
              answer,
              ...rest
            }) => ({
              ...rest,
              copy: true,
              id: -1,
              difficultyLevel: difficulty_level,
              availableOnQuestionsDB: false,
              imageObj:
                image_question &&
                (await getFileFromUrl(image_question.url, image_question.name)),
              imageUrl: image_question ? image_question.url : '',
              tags: tags_question.map((item) => item.name),
              answer: answer.map((item) => ({ ...item, id: -1 })),
            })
          )
        );
        formik.setFieldValue('questions', newQuestions);
      } else {
        formik.setFieldValue('questions', []);
      }
    },
  });

  useEffect(() => {
    const getTags = async () => {
      const { data } = await api.get('/tag/question');
      if (data) {
        const newSuggestions = data.map((tag) => tag.name);
        formik.setFieldValue('suggestions', newSuggestions);
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

  const [openSnackBar, setOpenSnackBar] = useState(false);

  const handleCloseSnackBar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackBar(false);
  };

  const handleClickSnackBar = (checked) => {
    setOpenSnackBar(false);
    if (!checked) {
      setTimeout(() => {
        setOpenSnackBar(true);
      }, 250);
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
              onClick={() => handleClickSnackBar(checkboxes[question.title])}
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
        openSnackBar={openSnackBar}
        handleCloseSnackBar={handleCloseSnackBar}
        autoHideDuration={1000}
        text="Questão adicionada com sucesso!"
      />
    </>
  );
});

export default QuestionDatabase;

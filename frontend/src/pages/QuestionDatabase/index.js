import React, { forwardRef, useState, useEffect } from 'react';
import { useFormik } from 'formik';
import api from '@api';

// COMPONENTS
import GridContainer from '@components/Container';
import InputAutoComplete from '@components/AutoCompleteInput';
import { IconButton, Grid, Typography, Divider } from '@material-ui/core';
import { Close, Search } from '@material-ui/icons';
import Question from './question';

// ICONS
import { StyledSearchTagButton } from './style';

const Wrapper = forwardRef((props, ref) => (
  <GridContainer ref={ref} {...props} />
));

// eslint-disable-next-line no-unused-vars
const QuestionDatabase = forwardRef((props, ref) => {
  const [checkboxes, setCheckboxes] = useState([]);

  const formik = useFormik({
    initialValues: {
      tag: '',
      questions: [],
      suggestions: ['aprenda', 'ola'],
    },
    onSubmit: async ({ tag }) => {
      const { data } = await api.get(`question/${tag}`);

      // eslint-disable-next-line camelcase
      const newQuestions = data.map(({ tags_question, ...rest }) => ({
        ...rest,
        copy: true,
        id: -1,
        availableOnQuestionsDB: false,
        image: null,
        tags: tags_question.map((item) => item.name),
      }));

      formik.setFieldValue('questions', newQuestions);
    },
  });

  useEffect(() => {
    const getTags = async () => {
      const { data } = await api.get('/tag/question');

      const newSuggestions = data.map((tag) => tag.name);
      formik.setFieldValue('suggestions', newSuggestions);
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
    <Wrapper container spacing={3}>
      <Grid container justify="center" alignItems="center">
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
        justify="center"
        alignItems="center"
        spacing={2}
      >
        <Grid item xs={9}>
          <InputAutoComplete
            fullWidth
            id="tag"
            stateValue={formik.values.tag}
            suggestions={formik.values.suggestions}
            onChange={formik.handleChange}
            variant="filled"
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
        justify="center"
        style={{
          overflow: 'auto',
          minHeight: '40px',
          maxHeight: 'calc(100vh - 25px - 72px - 48px - 60px)',
        }}
      >
        {formik.values.questions.map((question) => (
          <Grid key={question.title} item xs={12}>
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
  );
});

export default QuestionDatabase;

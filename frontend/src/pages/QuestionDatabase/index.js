import React, { forwardRef, useState, useEffect } from 'react';

import { IconButton, Grid, Typography, Divider } from '@material-ui/core';

// COMPONENTS
import GridContainer from '@components/Container';
import InputAutoComplete from '@components/AutoCompleteInput';
import { Close, Search } from '@material-ui/icons';
import Question from './question';

// ICONS
import { StyledSearchTagButton } from './style';

const FakeQuestions = [
  {
    copy: true,
    id: -1,
    availableOnQuestionsDB: false,
    title: 'Chabu é erro?',
    correctAnswer: true,
    timer: 15,
    difficultyLevel: 3,
    quiz_id: 2,
    image: null,
    answer: [
      {
        title: 'Verdadeiro',
        is_correct: true,
      },
      {
        title: 'Falso',
        is_correct: false,
      },
    ],
    tags: ['erro'],
  },
  {
    copy: true,
    id: -1,
    availableOnQuestionsDB: false,
    title: 'Chabu é correto?',
    correctAnswer: true,
    timer: 15,
    image: null,
    difficultyLevel: 3,
    quiz_id: 2,
    answer: [
      {
        title: 'Verdadeiro',
        is_correct: true,
      },
      {
        title: 'Falso',
        is_correct: false,
      },
    ],
    tags: ['erro'],
  },
  {
    copy: true,
    id: -1,
    availableOnQuestionsDB: false,
    title: 'Chabu é teste?',
    correctAnswer: true,
    timer: 15,
    image: null,
    difficultyLevel: 3,
    quiz_id: 2,
    answer: [
      {
        title: 'Verdadeiro',
        is_correct: true,
      },
      {
        title: 'Falso',
        is_correct: false,
      },
    ],
    tags: ['erro'],
  },
  {
    copy: true,
    id: -1,
    availableOnQuestionsDB: false,
    title: 'Chabu é aaa?',
    correctAnswer: true,
    timer: 15,
    image: null,
    difficultyLevel: 3,
    quiz_id: 2,
    answer: [
      {
        title: 'Verdadeiro',
        is_correct: true,
      },
      {
        title: 'Falso',
        is_correct: false,
      },
    ],
    tags: ['erro'],
  },
  {
    copy: true,
    id: -1,
    availableOnQuestionsDB: false,
    title: 'Chabu é dawdawdawdwa?',
    correctAnswer: true,
    timer: 15,
    image: null,
    difficultyLevel: 3,
    quiz_id: 2,
    answer: [
      {
        title: 'Verdadeiro',
        is_correct: true,
      },
      {
        title: 'Falso',
        is_correct: false,
      },
    ],
    tags: ['erro'],
  },
];

const Wrapper = forwardRef((props, ref) => (
  <GridContainer ref={ref} {...props} />
));

// eslint-disable-next-line no-unused-vars
const QuestionDatabase = forwardRef((props, ref) => {
  const [checkboxes, setCheckboxes] = useState([]);

  useEffect(() => {
    FakeQuestions.map((item) => {
      if (props.questions.includes(item)) {
        setCheckboxes((prevState) => ({ ...prevState, [item.title]: true }));
        return true;
      }
      return false;
    });
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

      <Grid container justify="center" alignItems="center" spacing={2}>
        <Grid item xs={9}>
          <InputAutoComplete
            fullWidth
            stateValue="tag"
            suggestions={['aprenda', 'ola']}
            onChange={(e) => {
              console.log(e);
            }}
            variant="filled"
            label="Tag"
            placeholder="Digite a Tag de questões que você deseja pesquisar..."
          />
        </Grid>
        <Grid item xs={3}>
          <StyledSearchTagButton
            startIcon={<Search />}
            fullWidth
            color="primary"
            variant="contained"
          >
            Pesquisar
          </StyledSearchTagButton>
        </Grid>
      </Grid>

      <Grid item>
        <Divider />
      </Grid>

      <Grid
        container
        spacing={3}
        justify="center"
        style={{
          overflow: 'scroll',
          height: 'calc(100vh - 25px - 72px - 48px - 60px)',
        }}
      >
        {FakeQuestions.map((question) => (
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

/* eslint-disable camelcase */
import React, { useState, useEffect, forwardRef } from 'react';
import { useFormik } from 'formik';
import api from '@api';

// COMPONENTS
import Wrapper from '@components/RefferedContainer';
import TagInput from '@components/ChipInput';
import {
  IconButton,
  Grid,
  Typography,
  Divider,
  CircularProgress,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from '@mui/material';
import { Close, Search } from '@mui/icons-material';
import SnackBar from '@components/SnackBar';
import getFileFromUrl from '@utils/getFileFromUrl';
import Question from './question';

// ICONS
import { StyledSearchTagButton, TagWrapper, TagItem } from './style';

// async function getFileFromUrl(url, name, defaultType = 'image/jpeg') {
//   const response = await fetch(url);
//   const data = await response.blob();

//   return new File([data], name, {
//     type: response.headers.get('content-type') || defaultType,
//   });
// }

const AMOUNT_OF_MOST_USED_TAG = 10;

const QuestionDatabase = forwardRef((props, ref) => {
  const { handleClose, handleaddQuestion, handleRemoveQuestion } = props;
  const [mostUsedTags, setMostUsedTags] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [checkboxes, setCheckboxes] = useState([]);

  const initialState = {
    tag: [],
    questions: [],
    suggestions: [],
    typeOfFilter: 'and',
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
    onSubmit: async ({ tag, typeOfFilter }) => {
      try {
        setLoading(true);
        const { data } = await api.post(`/teacherQuestion/getFromTags`, {
          aimedTagQuestions: tag,
          typeOfFilter,
        });

        if (data) {
          const newQuestions = await Promise.all(
            data.map(
              async ({
                tagsQuestion,
                imageQuestion,
                difficultyLevel,
                availableOnQuestionsDb,
                answer,
                ...rest
              }) => ({
                ...rest,
                copy: true,
                id: -1,
                difficultyLevel,
                availableOnQuestionsDB: false,
                imageObj:
                  imageQuestion?.url &&
                  (await getFileFromUrl(imageQuestion?.url)),
                imageUrl: imageQuestion?.url,
                tags: tagsQuestion.map((item) => item.name),
                answer: answer.map((item) => ({ ...item, id: -1 })),
              })
            )
          );
          formik.setFieldValue('questions', newQuestions);
        } else {
          formik.setFieldValue('questions', []);
        }
      } catch (error) {
        formik.setFieldValue('questions', []);
        handleClickSnackBar(error.response.data.response, 'error');
      }
      setLoading(false);
    },
  });

  useEffect(() => {
    const getTags = async () => {
      try {
        const response = await api.get('/teacherTag/question');
        if (response.data) {
          const newSuggestions = response.data.map((tag) => tag.name);
          if (newSuggestions.length > 0) {
            setMostUsedTags(newSuggestions.slice(0, AMOUNT_OF_MOST_USED_TAG));
          }
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
        handleClickSnackBar(error.response.data.response, 'error');
      }
    };

    getTags();
  }, []);

  const handleQuestionChecked = (index) => (e) => {
    const question = formik.values.questions[index];

    setCheckboxes((prevState) => ({
      ...prevState,
      [question.title]: e.target.checked,
    }));

    if (e.target.checked) {
      const indexOfNewQuestion = handleaddQuestion(question);

      // A linha abaixo realiza a alteração no objeto de valores do formik
      question.index = indexOfNewQuestion;
    } else {
      const newIndexAfterAdding = formik.values.questions[index].index;
      handleRemoveQuestion(newIndexAfterAdding);
    }
  };

  return (
    <>
      <Wrapper
        container
        spacing={3}
        width="45vw"
        style={{ maxHeight: '80vh', flexWrap: 'nowrap' }}
      >
        <Grid container justifyContent="center" alignItems="center">
          <Grid item xs={3} md={1}>
            <IconButton aria-label="closeModal" onClick={handleClose}>
              <Close />
            </IconButton>
          </Grid>
          <Grid item xs={9} md={11}>
            <Typography variant="h5" color="primary">
              Banco de Questões via Tags
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
          {mostUsedTags.length > 0 && (
            <Grid item xs={12}>
              <FormLabel id="choose_filter">Tags mais utilizadas</FormLabel>
              <TagWrapper>
                {mostUsedTags.map((tag) => (
                  <TagItem
                    key={tag}
                    onClick={() => {
                      formik.setFieldValue('tag', [
                        ...new Set([
                          ...formik.values.tag,
                          tag.toLowerCase().trim(),
                        ]),
                      ]);

                      handleClickSnackBar(
                        'Tag selecionada.',
                        'success',
                        false,
                        2000
                      );
                    }}
                  >
                    {tag}
                  </TagItem>
                ))}
              </TagWrapper>
            </Grid>
          )}
          <Grid item xs={12}>
            <FormControl>
              <FormLabel id="choose_filter">Filtragem</FormLabel>

              <RadioGroup
                row
                aria-labelledby="choose_filter"
                name="typeOfFilter"
                id="typeOfFilter"
                value={formik.values.typeOfFilter}
                onChange={formik.handleChange}
              >
                <FormControlLabel
                  value="and"
                  control={<Radio />}
                  label="Todas as tags"
                />
                <FormControlLabel
                  value="or"
                  control={<Radio />}
                  label="Qualquer combinação de tags"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={9}>
            <TagInput
              fullWidth
              id="tag"
              value={formik.values.tag}
              suggestions={formik.values.suggestions}
              onChange={(e, value) => {
                formik.setFieldValue('tag', [
                  ...new Set(
                    value.map((element) => element.toLowerCase().trim())
                  ),
                ]);
              }}
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
            paddingTop: '5px',
            paddingBottom: '20px',
            // maxHeight: 'calc(100vh - 25px - 72px - 48px - 60px)',
          }}
        >
          {formik.values.questions.map((question, index) => (
            <Grid
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              item
              xs={12}
              onClick={() => {
                const text = checkboxes[question.title]
                  ? 'Questão removida com sucesso!'
                  : 'Questão adicionada com sucesso!';
                handleClickSnackBar(
                  text,
                  'success',
                  checkboxes[question.title]
                );
              }}
            >
              <Question
                question={question}
                id={question.title}
                checked={checkboxes[question.title]}
                onChange={() => handleQuestionChecked(index)}
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

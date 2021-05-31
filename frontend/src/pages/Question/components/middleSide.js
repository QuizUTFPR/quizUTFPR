import React from 'react';

// ICONS
import { Delete } from '@material-ui/icons/';

// COMPONENTS
import StyledButton from '@components/Button';
import { Grid } from '@material-ui/core';
import CheckBox from './checkbox';
import DragImageInput from './dragImage';

import {
  StyledAnswerInput,
  StyledTitleInput,
  StyledGrid,
  GridRegisterQuestion,
  PreviewImage,
} from '../style';

const MiddleSide = ({
  questions,
  formik,
  updateQuestion,
  updateAnswer,
  handleClickOpenAlert,
  errors,
}) => (
  <Grid item xs={7}>
    <StyledGrid container justify="center" align="center">
      {questions.length ? (
        <>
          <Grid item xs={12}>
            ̣ <PreviewImage src={formik.values.question.imageUrl} />
          </Grid>

          <Grid item xs={12}>
            <DragImageInput
              formikID={['question.imageObj', 'question.imageUrl']}
              name="Imagem de Capa"
              handleFormikChange={formik.setFieldValue}
              handlePropsChange={{
                handleUpdate: updateQuestion,
                key: ['imageObj', 'imageUrl'],
                index: formik.values.index,
              }}
            />
          </Grid>

          <Grid item xs={12}>
            {errors.title && <span>Informe o título!</span>}
            <StyledTitleInput
              placeholder="DIGITE O ENUNCIADO AQUI"
              formikID="question.title"
              handleFormikChange={formik.handleChange}
              value={formik.values.question.title}
              handlePropsChange={{
                handleUpdate: updateQuestion,
                key: 'title',
                index: formik.values.index,
              }}
              required
              autoFocus
            />
          </Grid>
          {errors.is_correct && <span>Informe uma alternativa correta.</span>}
          {errors.answer && <span>Informe todas as alternativas.</span>}
          <Grid container align="center" justify="center" spacing={2}>
            {formik.values.question.answer.map((item, index) => (
              <Grid
                item
                xs={12}
                md={6}
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                style={{
                  display: 'flex',
                  height: '80px',
                  alignItems: 'center',
                }}
              >
                <CheckBox
                  style={{ width: '50px', height: '50px' }}
                  inputProps={{ 'aria-label': 'primary checkbox' }}
                  checked={Boolean(item.is_correct)}
                  formikID={`question.answer[${index}].is_correct`}
                  handleFormikChange={formik.handleChange}
                  handlePropsChange={{
                    handleUpdate: updateAnswer,
                    key: 'is_correct',
                    indexQuestion: formik.values.index,
                    indexAnswer: index,
                  }}
                />
                <StyledAnswerInput
                  type="text"
                  placeholder={`DIGITE A ALTERNATIVA ${index + 1}`}
                  formikID={`question.answer[${index}].title`}
                  value={item.title}
                  handleFormikChange={formik.handleChange}
                  handlePropsChange={{
                    handleUpdate: updateAnswer,
                    key: 'title',
                    indexQuestion: formik.values.index,
                    indexAnswer: index,
                  }}
                  required
                />
              </Grid>
            ))}
          </Grid>

          <GridRegisterQuestion item xs={6}>
            <StyledButton
              type="submit"
              fullWidth
              color="secondary"
              variant="outlined"
              onClick={handleClickOpenAlert}
              startIcon={<Delete />}
              size="large"
            >
              Excluir Questão
            </StyledButton>
          </GridRegisterQuestion>
        </>
      ) : (
        <p>Vazio!</p>
      )}
    </StyledGrid>
  </Grid>
);
export default MiddleSide;

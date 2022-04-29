import React from 'react';
import PropTypes from 'prop-types';

// ICONS
import { FileCopy } from '@mui/icons-material/';

// COMPONENTS
import ErrorMessage from '@components/Messages/error';
import { Grid, Typography, FormControlLabel } from '@mui/material';
import {
  StyledRightGrid,
  GridItemStyledRight,
  CopiedQuestionMessage,
  WrapperCheckBoxRight,
} from '../style';
import SelectInput from './select';
import TagInput from './tagInput';
import CheckBox from './checkbox';

const RightSide = ({
  formik,
  updateQuestion,
  questions,
  errors,
  handleOpenChangeTypeQuestion,
  location,
  optionsOfTime,
  optionsOfDifficultyLevel,
}) => (
  <Grid item xs={3}>
    <StyledRightGrid container align="center" direction="column">
      <Grid item style={{ marginBottom: '40px' }}>
        <Typography color="primary" component="h5" variant="h5">
          Detalhes da Questão
        </Typography>
      </Grid>

      {questions.length ? (
        <>
          <GridItemStyledRight item>
            <SelectInput
              fullWidth
              label="Tipo da Questão"
              name="type"
              variant="outlined"
              formikID=""
              disabled={location.state.published}
              value={formik.values.question.type}
              handleFormikChange={() => (e) => {
                handleOpenChangeTypeQuestion({
                  open: true,
                  indexQuestion: formik.values.index,
                  type: e.target.value,
                  formikUpdate: formik.setFieldValue,
                  formikTypeID: 'question.type',
                  formikAnswerID: 'question.answer',
                });
              }}
              required
            >
              <option value="multipleChoice">Múltipla Escolha</option>
              <option value="singleChoice">Verdadeiro ou Falso</option>
            </SelectInput>
          </GridItemStyledRight>

          {!location.state.noTime && (
            <GridItemStyledRight item>
              <SelectInput
                fullWidth
                disabled={location.state.published}
                label="Tempo"
                name="time"
                variant="outlined"
                formikID="question.timer"
                value={formik.values.question.timer}
                handleFormikChange={formik.handleChange}
                handlePropsChange={{
                  handleUpdate: updateQuestion,
                  key: 'timer',
                  index: formik.values.index,
                }}
                required
              >
                {Object.entries(optionsOfTime).map((item) => (
                  <option key={item[1]} value={item[1]}>
                    {item[0]}
                  </option>
                ))}
              </SelectInput>
            </GridItemStyledRight>
          )}

          <GridItemStyledRight item>
            <SelectInput
              fullWidth
              disabled={location.state.published}
              label="Nível de Dificuldade"
              name="difficultyLevel"
              variant="outlined"
              formikID="question.difficultyLevel"
              value={formik.values.question.difficultyLevel}
              handleFormikChange={formik.handleChange}
              handlePropsChange={{
                handleUpdate: updateQuestion,
                key: 'difficultyLevel',
                index: formik.values.index,
              }}
              required
            >
              {Object.entries(optionsOfDifficultyLevel).map((item) => (
                <option key={item[0]} value={item[0]}>
                  {item[1]}
                </option>
              ))}
            </SelectInput>
          </GridItemStyledRight>

          {errors.tags && (
            <ErrorMessage style={{ marginBottom: 20 }}>
              Por favor, informe ao menos uma tag.
            </ErrorMessage>
          )}

          <GridItemStyledRight item>
            <TagInput
              fullWidth
              suggestions={[]}
              required={formik.values.question.availableOnQuestionsDB}
              disabled={location.state.published}
              value={formik.values.question.tags}
              formikID="question.tags"
              handleFormikChange={formik.setFieldValue}
              handlePropsChange={{
                handleUpdate: updateQuestion,
                key: 'tags',
                index: formik.values.index,
              }}
            />
          </GridItemStyledRight>

          <WrapperCheckBoxRight item>
            {!formik.values.question.copy ? (
              <FormControlLabel
                control={
                  <CheckBox
                    disabled={
                      Boolean(formik.values.question.copy) ||
                      location.state.published
                    }
                    style={{ width: '50px', height: '50px' }}
                    inputProps={{
                      'aria-label': 'primary checkbox',
                      label: 'teste',
                    }}
                    checked={formik.values.question.availableOnQuestionsDB}
                    formikID="question.availableOnQuestionsDB"
                    handleFormikChange={formik.handleChange}
                    handlePropsChange={{
                      handleUpdate: updateQuestion,
                      key: 'availableOnQuestionsDB',
                      index: formik.values.index,
                    }}
                  />
                }
                label="Disponível no Banco de Questões"
              />
            ) : (
              <CopiedQuestionMessage item xs={12}>
                <FileCopy />
                <span>
                  Esta questão é uma copia retirada do banco de questões.
                </span>
              </CopiedQuestionMessage>
            )}
          </WrapperCheckBoxRight>
        </>
      ) : (
        <p>Vazio!</p>
      )}
    </StyledRightGrid>
  </Grid>
);

RightSide.defaultProps = {};

RightSide.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleOpenChangeTypeQuestion: PropTypes.func.isRequired,
  updateQuestion: PropTypes.func.isRequired,
};

export default RightSide;

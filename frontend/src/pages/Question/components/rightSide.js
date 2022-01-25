import React from 'react';
import PropTypes from 'prop-types';

// ICONS
import { FileCopy } from '@mui/icons-material/';

// COMPONENTS
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
  handleOpenChangeTypeQuestion,
  location,
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
              <option value="multiple_choice">Múltipla Escolha</option>
              <option value="single_choice">Verdadeiro ou Falso</option>
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
                <option value={240}>4 minutos</option>
                <option value={180}>3 minutos</option>
                <option value={120}>2 minutos</option>
                <option value={60}>1 minuto</option>
                <option value={45}>45 segundos</option>
                <option value={30}>30 segundos</option>
                <option value={15}>15 segundos</option>
                <option value={10}>10 segundos</option>
              </SelectInput>
            </GridItemStyledRight>
          )}

          <GridItemStyledRight item>
            <TagInput
              fullWidth
              suggestions={[]}
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
              <option value="Muito Fácil">Muito Fácil</option>
              <option value="Fácil">Fácil</option>
              <option value="Médio">Médio</option>
              <option value="Difícil">Difícil</option>
              <option value="Muito Difícil">Muito Difícil</option>
            </SelectInput>
          </GridItemStyledRight>

          <WrapperCheckBoxRight item>
            {!formik.values.question.copy ? (
              <FormControlLabel
                control={
                  <CheckBox
                    type="multiple_choice"
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

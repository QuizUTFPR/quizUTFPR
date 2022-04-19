import React from 'react';
import PropTypes from 'prop-types';

// ICONS
import { Delete, Check, AttachFile, Edit } from '@mui/icons-material/';

// COMPONENTS
import StyledButton from '@components/Button';
import { Grid } from '@mui/material';
import ErrorMessage from '@components/Messages/error';
import Tooltip from '@components/ToolTip';
import InputOrLatexContent from './PreviewLatex';

// import DragImageInput from './dragImage';

import {
  StyledAnswerInput,
  StyledTitleInput,
  StyledGrid,
  GridButton,
  PreviewImage,
  HiddenCheckBox,
  ShowOption,
  HiddenRadio,
  ContainerImage,
  StackImageButton,
  PreviewImageButton,
  TitleQuestionMathJax,
  AnswerQuestionMathJax,
} from '../style';

const MiddleSide = ({
  questions,
  formik,
  updateQuestion,
  updateAnswer,
  handleClickOpenAlert,
  handleOpenDragImage,
  errors,
  location,
}) => (
  <Grid item xs={6}>
    <StyledGrid container justifyContent="center" align="center">
      {questions.length ? (
        <>
          {errors.title && (
            <ErrorMessage>
              Por favor, informe o enunciado da questão.
            </ErrorMessage>
          )}
          <Grid item xs={12}>
            <InputOrLatexContent
              disabled={location.state.published}
              latexComponent={{
                component: TitleQuestionMathJax,
                propsLatex: {
                  placeholder: 'DIGITE O ENUNCIADO AQUI',
                },
              }}
              inputComponent={{
                component: StyledTitleInput,
                propsInput: {
                  disabled: location.state.published,
                  placeholder: 'DIGITE O ENUNCIADO AQUI',
                  formikID: 'question.title',
                  handleFormikChange: formik.handleChange,
                  value: formik.values.question.title,
                  handlePropsChange: {
                    handleUpdate: updateQuestion,
                    key: 'title',
                    index: formik.values.index,
                  },
                  required: true,
                  autoFocus: true,
                },
              }}
            />
          </Grid>

          {formik.values.question.imageUrl && (
            <ContainerImage style={{ marginTop: '10px' }}>
              {!location.state.published && (
                <StackImageButton>
                  <Tooltip arrow ariaLabel="editar" title="Editar">
                    <PreviewImageButton
                      size="small"
                      onClick={handleOpenDragImage}
                    >
                      <Edit />
                    </PreviewImageButton>
                  </Tooltip>

                  <Tooltip arrow ariaLabel="excluir" title="Excluir">
                    <PreviewImageButton
                      size="small"
                      onClick={() => {
                        formik.setFieldValue('question.imageUrl', '');
                        updateQuestion({
                          value: '',
                          key: 'imageUrl',
                          index: formik.values.index,
                        });
                      }}
                    >
                      <Delete />
                    </PreviewImageButton>
                  </Tooltip>
                </StackImageButton>
              )}
              <PreviewImage src={formik.values.question.imageUrl} />
            </ContainerImage>
          )}
          {!location.state.published && !formik.values.question.imageUrl && (
            <Grid item xs={12} style={{ marginTop: '20px' }}>
              <StyledButton
                style={{ width: '50%' }}
                color="secondary"
                variant="outlined"
                onClick={handleOpenDragImage}
                disabled={location.state.published}
                startIcon={<AttachFile />}
                size="large"
                loading={false}
              >
                Adicionar Imagem
              </StyledButton>
            </Grid>
          )}

          <Grid item xs={12}>
            {errors.isCorrect && (
              <ErrorMessage style={{ marginBottom: '10px' }}>
                Por favor, informe ao menos uma alternativa correta.
              </ErrorMessage>
            )}

            {errors.answer && (
              <ErrorMessage>
                Por favor, escreva todas as alternativas.
              </ErrorMessage>
            )}
          </Grid>

          <Grid container align="center" justifyContent="center" spacing={2}>
            {formik.values.question.answer.map((item, index) => (
              <Grid
                item
                md={6}
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '20px',
                  marginTop: '20px',
                }}
              >
                <>
                  <ShowOption
                    disabled={location.state.published}
                    checked={Boolean(item.isCorrect)}
                  >
                    <Check />
                  </ShowOption>
                  {formik.values.question.type === 'multipleChoice' ? (
                    <HiddenCheckBox
                      disabled={location.state.published}
                      style={{ width: '50px', height: '50px' }}
                      checked={Boolean(item.isCorrect)}
                      formikID={`question.answer[${index}].isCorrect`}
                      handleFormikChange={formik.handleChange}
                      handlePropsChange={{
                        handleUpdate: updateAnswer,
                        key: 'isCorrect',
                        indexQuestion: formik.values.index,
                        indexAnswer: index,
                      }}
                    />
                  ) : (
                    <HiddenRadio
                      disabled={location.state.published}
                      style={{ width: '50px', height: '50px' }}
                      value={item.isCorrect}
                      formikID={`question.answer[${index}].isCorrect`}
                      formikOtherID={`question.answer[${
                        index === 0 ? 1 : 0
                      }].isCorrect`}
                      handleFormikChange={formik.setFieldValue}
                      handlePropsChange={{
                        handleUpdate: updateAnswer,
                        key: 'isCorrect',
                        indexQuestion: formik.values.index,
                        indexAnswer: index,
                        indexOtherAnswer: index === 0 ? 1 : 0,
                      }}
                    />
                  )}
                </>

                <InputOrLatexContent
                  disabled={location.state.published}
                  latexComponent={{
                    component: AnswerQuestionMathJax,
                    propsLatex: {
                      placeholder: `DIGITE A ALTERNATIVA ${index + 1}`,
                    },
                  }}
                  inputComponent={{
                    component: StyledAnswerInput,
                    propsInput: {
                      type: 'text',
                      disabled: location.state.published,
                      placeholder: `DIGITE A ALTERNATIVA ${index + 1}`,
                      formikID: `question.answer[${index}].title`,
                      value: item.title,
                      handleFormikChange: formik.handleChange,
                      handlePropsChange: {
                        handleUpdate: updateAnswer,
                        key: 'title',
                        indexQuestion: formik.values.index,
                        indexAnswer: index,
                      },
                      required: true,
                    },
                  }}
                />
              </Grid>
            ))}
          </Grid>

          <GridButton item xs={6}>
            <StyledButton
              loading={false}
              type="submit"
              disabled={location.state.published}
              style={{ width: '80%' }}
              color="secondary"
              variant="outlined"
              onClick={handleClickOpenAlert}
              startIcon={<Delete />}
              size="large"
            >
              Excluir Questão
            </StyledButton>
          </GridButton>
        </>
      ) : (
        <p>Vazio!</p>
      )}
    </StyledGrid>
  </Grid>
);

MiddleSide.defaultProps = {};

MiddleSide.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  updateQuestion: PropTypes.func.isRequired,
  updateAnswer: PropTypes.func.isRequired,
  handleClickOpenAlert: PropTypes.func.isRequired,
  errors: PropTypes.shape({
    title: PropTypes.bool,
    isCorrect: PropTypes.bool,
    answer: PropTypes.bool,
  }).isRequired,
};

export default MiddleSide;

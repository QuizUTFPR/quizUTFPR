/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import { MathJax } from 'better-react-mathjax';

// ICONS
import { AddCircle, ArrowUpward, ArrowDownward } from '@material-ui/icons/';

// COMPONENTS
import { Grid, Typography, IconButton } from '@material-ui/core';
import StyledButton from '@components/Button';
// import configMathJax from '../../../config/mathJax';

import {
  StyledLeftGrid,
  GridButtonNewQuestion,
  CardSelectQuestion,
  GridQuestions,
} from '../style';

const LeftSide = ({
  questions,
  questionOnScreen,
  handleOpenModalTypeQuestion,
  handleChangeQuestion,
  handleToDown,
  handleToUp,
  location,
}) => (
  <Grid item xs={3}>
    <StyledLeftGrid container align="center">
      <Grid item xs={12}>
        <Typography color="primary" component="h5" variant="h5">
          Questões
        </Typography>
      </Grid>

      <GridQuestions
        container
        spacing={2}
        justifyContent="center"
        align="center"
      >
        {questions.map((item, index) => (
          <Grid item key={index} xs={12} style={{ display: 'flex' }}>
            <Grid
              item
              xs={1}
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              {index !== 0 && (
                <IconButton
                  onClick={() => handleToUp(index, handleChangeQuestion)}
                  size="small"
                  disabled={location.state.published}
                >
                  <ArrowUpward />
                </IconButton>
              )}
              {index !== questions.length - 1 && (
                <IconButton
                  disabled={location.state.published}
                  onClick={() => handleToDown(index, handleChangeQuestion)}
                  size="small"
                >
                  <ArrowDownward />
                </IconButton>
              )}
            </Grid>
            <Grid item xs={11}>
              <CardSelectQuestion
                fullWidth
                isonscreen={index === questionOnScreen.index ? 'true' : 'false'}
                color="primary"
                variant="outlined"
                onClick={handleChangeQuestion(item, index)}
              >
                <MathJax dynamic hideUntilTypeset="every">
                  {item.title ? item.title : 'Sem Enunciado'}
                </MathJax>
              </CardSelectQuestion>
            </Grid>
          </Grid>
        ))}
      </GridQuestions>

      <GridButtonNewQuestion item xs={12}>
        <StyledButton
          onClick={handleOpenModalTypeQuestion}
          fullWidth
          variant="contained"
          color="secondary"
          startIcon={<AddCircle />}
          size="large"
          disabled={location.state.published}
        >
          CRIAR
        </StyledButton>
      </GridButtonNewQuestion>
    </StyledLeftGrid>
  </Grid>
);

LeftSide.defaultProps = {};

LeftSide.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  questionOnScreen: PropTypes.shape({
    index: PropTypes.number,
  }).isRequired,
  handleOpenModalTypeQuestion: PropTypes.func.isRequired,
  handleChangeQuestion: PropTypes.func.isRequired,
  handleToDown: PropTypes.func.isRequired,
  handleToUp: PropTypes.func.isRequired,
};

export default LeftSide;

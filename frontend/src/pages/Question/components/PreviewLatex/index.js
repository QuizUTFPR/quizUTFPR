/* eslint-disable camelcase */
import React, { forwardRef } from 'react';
import { MathJax, MathJaxContext } from 'better-react-mathjax';

// COMPONENTS
import GridContainer from '@components/Container';
import { IconButton, Grid, Typography } from '@material-ui/core';
import { Close } from '@material-ui/icons';

const Wrapper = forwardRef((props, ref) => (
  <GridContainer ref={ref} {...props} />
));

const config = {
  loader: { load: ['[tex]/html'] },
  tex: {
    packages: { '[+]': ['html'] },
    inlineMath: [
      ['$', '$'],
      ['\\(', '\\)'],
    ],
    displayMath: [
      ['$$', '$$'],
      ['\\[', '\\]'],
    ],
  },
};

// eslint-disable-next-line no-unused-vars
const QuestionDatabase = forwardRef((props, ref) => (
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
            Visualizador
          </Typography>
        </Grid>
      </Grid>

      <Grid container justifyContent="center" alignItems="center" spacing={2}>
        <MathJaxContext version={3} config={config}>
          <MathJax dynamic hideUntilTypeset="first">
            {'$lim_{x \\to infty}$ daddddddddddwdwa $exp(-x) = 0$ dawdwa'}
          </MathJax>
        </MathJaxContext>
      </Grid>
    </Wrapper>
  </>
));

export default QuestionDatabase;

/* eslint-disable camelcase */
import React, { forwardRef } from 'react';
import { MathJaxContext } from 'better-react-mathjax';

// COMPONENTS
import GridContainer from '@components/Container';
import { IconButton, Grid, Typography, Divider } from '@material-ui/core';
import { Close } from '@material-ui/icons';

import {
  GridInputSimulator,
  DemoContainer,
  GridImage,
  DemoPreviewImage,
  GridContainerDemoAnswer,
  GridContainerDemoTitle,
  TitleQuestionMathJax,
  AnswerQuestionMathJax,
} from './style';

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
const QuestionDatabase = forwardRef((props, ref) => {
  const question = props.questionData;
  const { handleClose } = props;
  return (
    <Wrapper container spacing={3}>
      <Grid container justifyContent="center" alignItems="center">
        <Grid item xs={3} md={1}>
          <IconButton aria-label="closeModal" onClick={handleClose}>
            <Close />
          </IconButton>
        </Grid>
        <Grid item xs={9} md={11}>
          <Typography variant="h5" color="primary">
            Visualizador
          </Typography>
        </Grid>
      </Grid>
      <Grid item>
        <Divider />
      </Grid>

      <DemoContainer spacing={1}>
        <MathJaxContext version={3} config={config}>
          <GridContainerDemoTitle>
            <GridImage>
              <DemoPreviewImage src={question.imageUrl} />
            </GridImage>

            <GridInputSimulator>
              <TitleQuestionMathJax dynamic hideUntilTypeset="first">
                {`${question.title}`}
              </TitleQuestionMathJax>
            </GridInputSimulator>
          </GridContainerDemoTitle>

          <GridContainerDemoAnswer>
            {question.answer.map((item) => (
              <GridInputSimulator key={item.title + item.id}>
                <AnswerQuestionMathJax dynamic hideUntilTypeset="first">
                  {`${item.title}`}
                </AnswerQuestionMathJax>
              </GridInputSimulator>
            ))}
          </GridContainerDemoAnswer>
        </MathJaxContext>
      </DemoContainer>
    </Wrapper>
  );
});

export default QuestionDatabase;

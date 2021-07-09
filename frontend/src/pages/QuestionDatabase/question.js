import React from 'react';
import styled from 'styled-components';
import { MathJaxContext, MathJax } from 'better-react-mathjax';

// UTILS
import getStringTypeOfQuestion from '@utils/getStringTypeOfQuestion';

import {
  Card,
  CardContent,
  Typography,
  CardActionArea,
  // Button,
  Divider,
  Grid,
} from '@material-ui/core';
import configMathJax from '../../config/mathJax';

const defaultMargin = '10px';

const QuestionCard = styled(Card)`
  && {
    border-color: ${({ checked, theme }) =>
      checked ? theme.palette.primary.main : ''};
  }
`;

const Answer = styled(Typography)`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.12);
`;

const WrongAnswer = styled(Answer)`
  border-left: 10px solid red;
`;

const CorrectgAnswer = styled(Answer)`
  border-left: 10px solid green;
`;

const TitleQuestion = styled(Typography)`
  margin-top: ${defaultMargin};
  margin-bottom: ${defaultMargin};
  font-weight: bolder;
`;
const CheckBox = styled.input.attrs({
  type: 'checkbox',
})`
  display: none;
`;

const Questions = ({ id, checked, onChange, question }) => (
  <MathJaxContext version={3} config={configMathJax}>
    <QuestionCard variant="outlined" checked={Boolean(checked)}>
      <CardActionArea component="label">
        <CardContent>
          <CheckBox checked={Boolean(checked)} onChange={onChange(id)} />
          <Grid container justifyContent="space-between">
            <Grid item>
              <Typography color="textSecondary" gutterBottom>
                {getStringTypeOfQuestion(question.type)}
              </Typography>
            </Grid>
            <Grid item>
              <Typography color="textSecondary" gutterBottom>
                {question.difficultyLevel}
              </Typography>
            </Grid>
          </Grid>
          <Divider />
          <TitleQuestion variant="h5" component="h2" color="primary">
            <MathJax dynamic hideUntilTypeset="first">
              {question.title}
            </MathJax>
          </TitleQuestion>
          <Typography color="textSecondary">Alternativas</Typography>
          <Grid container spacing={1}>
            {question.answer.map((item) => (
              // eslint-disable-next-line react/no-array-index-key
              <Grid item xs={12} md={6} key={`${item.id}+${item.title}`}>
                {item.is_correct ? (
                  <CorrectgAnswer>
                    <MathJax dynamic hideUntilTypeset="first">
                      {item.title}{' '}
                    </MathJax>
                  </CorrectgAnswer>
                ) : (
                  <WrongAnswer>
                    <MathJax dynamic hideUntilTypeset="first">
                      {item.title}
                    </MathJax>
                  </WrongAnswer>
                )}
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </CardActionArea>
    </QuestionCard>
  </MathJaxContext>
);

export default Questions;

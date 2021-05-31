import React from 'react';
import styled from 'styled-components';

import {
  Card,
  CardContent,
  Typography,
  CardActionArea,
  // Button,
  Divider,
  Grid,
} from '@material-ui/core';

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
  <QuestionCard variant="outlined" checked={Boolean(checked)}>
    <CardActionArea component="label">
      <CardContent>
        <CheckBox checked={Boolean(checked)} onChange={onChange(id)} />
        <Grid container justify="space-between">
          <Grid item>
            <Typography color="textSecondary" gutterBottom>
              Multípla Escolha
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
          {question.title}
        </TitleQuestion>
        <Typography color="textSecondary">Alternativas</Typography>
        <Grid container spacing={1}>
          {question.answer.map((item) => (
            <Grid item xs={12} md={6} key={item.id}>
              {item.is_correct ? (
                <CorrectgAnswer>{item.title}</CorrectgAnswer>
              ) : (
                <WrongAnswer>{item.title}</WrongAnswer>
              )}
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </CardActionArea>
  </QuestionCard>
);

export default Questions;

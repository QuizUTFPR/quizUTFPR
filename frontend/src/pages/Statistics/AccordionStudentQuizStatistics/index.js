import React, { useState, useEffect } from 'react';
import api from '@api';
import Chart from 'react-apexcharts';

// COMPONENTS
import {
  Accordion,
  AccordionDetails,
  Divider,
  Typography,
  TextField,
  MenuItem,
  Grid,
} from '@mui/material';
import CircularProgressWithLabel from '@components/CircularProgressWithLabel';

// ICONS
import { ExpandMore } from '@mui/icons-material';

// UTILS
import getStringTypeOfQuestion from '@utils/getStringTypeOfQuestion';

// STYLES
import {
  StudentBar,
  StyledTypography,
  QuizPercentageHit,
  QuizPercentageHitDescription,
  WrapperScore,
} from './style';

import {
  StyledAccordionSummary,
  AnswerItem,
  AnswerWrapper,
  AnswerTitle,
  HeaderTitle,
  WrapperResumeOfQuestion,
  WrapperResumeQuestion,
  TextTitleResumeOfQuestion,
  TextValueResumeOfQuestion,
} from '../style';

const AccordionWrapperStudent = ({ quizData }) => {
  const { countOfEachPorcentage = [], pin, quiz } = quizData;

  const options = {
    series: [
      {
        name: 'Quantidade de Alunos',
        type: 'column',
        data: countOfEachPorcentage.map((item) => item[1]),
      },
    ],
    options: {
      chart: {
        id: 'basic-bar',
        type: 'bar',
      },
      legend: {
        show: false,
      },
      xaxis: {
        categories: countOfEachPorcentage.map((item) => `${item[0]}`),
        labels: {
          style: {
            fontSize: '12px',
          },
        },
      },
      yaxis: [
        {
          title: {
            text: 'Quantidade de Alunos',
          },
        },
      ],
      dataLabels: {
        enabled: true,
      },
      colors: ['#d4526e'],
      stroke: {
        show: false,
      },

      plotOptions: {
        bar: {
          borderRadius: 5,
          dataLabels: {
            position: 'center', // top, center, bottom
          },
        },
      },
    },
  };

  return (
    <>
      {!quizData.studentQuiz.length && (
        <StyledTypography>
          Seu Quiz não foi respondido por nenhum aluno até o momento. <br />
          Compartilhe seu Quiz utilizando o seguinte PIN {pin}
        </StyledTypography>
      )}

      {quizData.studentQuiz.length > 0 && (
        <QuizPercentageHit>
          <Chart
            options={options.options}
            series={options.series}
            width="500"
          />

          <QuizPercentageHitDescription>
            O gráfico acima mostra a quantidade de alunos que atingiram
            determinadas porcentagem de acerto. <br />
            Compartilhe o PIN ({quiz.pin}) para mais alunos responderem seu
            quiz.
          </QuizPercentageHitDescription>
        </QuizPercentageHit>
      )}

      {quizData.studentQuiz.map((student, studentIndex) => (
        <Accordion key={student.id} TransitionProps={{ unmountOnExit: true }}>
          <StyledAccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls={`panel${studentIndex}bh-content`}
            id={`panel${studentIndex}bh-header`}
          >
            <StudentBar>
              <Typography>
                {studentIndex + 1}.{`  ${student.name}`}
              </Typography>
              <WrapperScore>
                <Typography>Score: {student.studentQuiz.score}</Typography>
                <CircularProgressWithLabel
                  value={parseInt(
                    (student.studentQuiz.score * 100) /
                      student.studentQuiz.quizQuestionChoice.length,
                    10
                  )}
                />
              </WrapperScore>
            </StudentBar>
          </StyledAccordionSummary>
          <AccordionDetails>
            {quizData.questions.map((question, questionIndex) => (
              <Accordion
                key={question.id}
                TransitionProps={{ unmountOnExit: true }}
              >
                <StyledAccordionSummary
                  expandIcon={<ExpandMore />}
                  aria-controls={`panel${questionIndex}bh-content`}
                  id={`panel${questionIndex}bh-header`}
                >
                  <Typography>
                    {questionIndex + 1}.{`  ${question.title}`}
                  </Typography>
                </StyledAccordionSummary>
                <AccordionDetails>
                  <WrapperResumeOfQuestion>
                    <HeaderTitle>Resumo</HeaderTitle>

                    <WrapperResumeQuestion>
                      <TextTitleResumeOfQuestion>
                        Dificuldade
                      </TextTitleResumeOfQuestion>
                      <TextValueResumeOfQuestion>
                        {question.difficultyLevel}
                      </TextValueResumeOfQuestion>
                    </WrapperResumeQuestion>
                    <Divider />
                    <WrapperResumeQuestion>
                      <TextTitleResumeOfQuestion>
                        Tempo
                      </TextTitleResumeOfQuestion>
                      <TextValueResumeOfQuestion>
                        {question.timer} segundos
                      </TextValueResumeOfQuestion>
                    </WrapperResumeQuestion>
                    <Divider />
                    <WrapperResumeQuestion>
                      <TextTitleResumeOfQuestion>
                        Tipo da Questão
                      </TextTitleResumeOfQuestion>
                      <TextValueResumeOfQuestion>
                        {getStringTypeOfQuestion(question.type)}
                      </TextValueResumeOfQuestion>
                    </WrapperResumeQuestion>
                  </WrapperResumeOfQuestion>

                  <AnswerWrapper>
                    {question.answer.map((answer, i) => (
                      <AnswerItem
                        correct={answer.isCorrect}
                        studentChecked={
                          student.studentQuiz.quizQuestionChoice[questionIndex][
                            `checked${i + 1}`
                          ]
                        }
                        key={answer.id}
                      >
                        <AnswerTitle
                          studentChecked={
                            student.studentQuiz.quizQuestionChoice[
                              questionIndex
                            ][`checked${i + 1}`]
                          }
                        >
                          {i + 1}.{`  ${answer.title}`}
                        </AnswerTitle>
                      </AnswerItem>
                    ))}
                  </AnswerWrapper>
                </AccordionDetails>
              </Accordion>
            ))}
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  );
};

export default AccordionWrapperStudent;

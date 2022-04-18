import React, { useState, useEffect } from 'react';
import api from '@api';

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

// ICONS
import { ExpandMore } from '@mui/icons-material';

// UTILS
import getStringTypeOfQuestion from '@utils/getStringTypeOfQuestion';

// STYLES
import { StudentBar, StyledTypography } from './style';
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

const AccordionWrapperStudent = ({ quizData, pin }) => {
  return (
    <>
      {!quizData.studentQuiz.length && (
        <StyledTypography>
          Seu Quiz não foi respondido por nenhum aluno até o momento. <br />
          Compartilhe seu Quiz utilizando o seguinte PIN {pin}
        </StyledTypography>
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
              <Typography>Score: {student.studentQuiz.score}</Typography>
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

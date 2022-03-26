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

const AccordionWrapperStudent = ({ quizData }) => {
  const { questions, studentQuiz } = quizData;
  const [teacherClasses, setTeacherClasses] = useState([]);
  // const [quizData, setQuizData] = useState({
  //   questions: initialQuestions,
  //   studentQuiz: initialStudentQuiz,
  // });
  const pin = 123;

  // const handleGetTeacherClasses = async () => {
  //   try {
  //     const { data } = await api.get('/class/getAllTeacherClasses');

  //     setTeacherClasses(data);
  //   } catch (error) {
  //     console.log('ERROR', error);
  //   }
  // };

  // useEffect(() => {
  //   handleGetTeacherClasses();

  //   return () => setTeacherClasses([]);
  // }, []);

  return (
    <>
      {!quizData.studentQuiz.length && (
        <StyledTypography>
          Seu Quiz não foi respondido por nenhum aluno até o momento. <br />
          Compartilhe seu Quiz utilizando o seguinte PIN {pin}
        </StyledTypography>
      )}

      {/* <TextField
        label="Turmas"
        id="turmas"
        name="turmas"
        variant="outlined"
        onChange={(event) => handleGetStatistics(quizId, event.target.value)}
        required
        select
      >
        <MenuItem>Todos</MenuItem>
        {teacherClasses.map((teacherClass) => (
          <MenuItem value={teacherClass.id} key={teacherClass.id}>
            {teacherClass.title}
          </MenuItem>
        ))}
      </TextField> */}

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

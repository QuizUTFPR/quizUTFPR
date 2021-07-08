import React from 'react';

// COMPONENTS
import {
  Accordion,
  AccordionDetails,
  Typography,
  Divider,
} from '@material-ui/core';
// import Tooltip from '@components/ToolTip';
// import CircularProgressWithLabel from '@components/CircularProgressWithLabel';

// ICONS
import {
  ExpandMore,
  // CheckCircle,
  // Cancel,
  // SentimentSatisfied,
} from '@material-ui/icons';

// UTILS
import getStringTypeOfQuestion from '@utils/getStringTypeOfQuestion';

// STYLES
import { StudentBar } from './style';
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

const AccordionWrapper = ({ quizData }) => {
  const { questions, studentQuiz } = quizData;
  return (
    <>
      {studentQuiz.map((student, studentIndex) => (
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
              <Typography>Score: {student.student_quiz.score}</Typography>
            </StudentBar>
          </StyledAccordionSummary>
          <AccordionDetails>
            {questions.map((question, questionIndex) => (
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
                        {question.difficulty_level}
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
                  {/* <TextWrapper>
                    <TextTitle>Dificuldade:</TextTitle>
                    <TextValue>{question.difficulty_level}</TextValue>
                  </TextWrapper>
                  <TextWrapper>
                    <TextTitle>Tempo:</TextTitle>
                    <TextValue>{question.timer} segundos</TextValue>
                  </TextWrapper>
                  <TextWrapper>
                    <TextTitle>Tipo da Questão:</TextTitle>
                    <TextValue>
                      {getStringTypeOfQuestion(question.type)}
                    </TextValue> */}
                  {/* </TextWrapper> */}
                  <AnswerWrapper>
                    {question.answer.map((answer, i) => (
                      <AnswerItem
                        correct={answer.is_correct}
                        studentChecked={
                          student.student_quiz.quiz_question_choice[
                            questionIndex
                          ][`checked${i + 1}`]
                        }
                        key={answer.id}
                      >
                        <AnswerTitle
                          studentChecked={
                            student.student_quiz.quiz_question_choice[
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

export default AccordionWrapper;

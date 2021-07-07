import React from 'react';

// COMPONENTS
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from '@material-ui/core';
import CircularProgressWithLabel from '@components/CircularProgressWithLabel';

// ICONS
import { ExpandMore } from '@material-ui/icons';

// STYLES
import {
  AnswerItem,
  AnswerWrapper,
  StudentWrapper,
  HeaderTitle,
  StudentInformation,
  AnswerTitle,
  AnswerNumberOfChoices,
  NameStudent,
  ChoiceStudent,
  IsStudentChoiceCorrect,
  BoxStudent,
  WrapperResumeOfQuestion,
  WrapperResumeQuestion,
  TextTitleResumeOfQuestion,
  TextValueResumeOfQuestion,
} from './style';

const getStudentChoice = (choice) => {
  const studentChoice = [];
  if (choice.checked1) studentChoice.push(1);
  if (choice.checked2) studentChoice.push(2);
  if (choice.checked3) studentChoice.push(3);
  if (choice.checked4) studentChoice.push(4);

  if (!studentChoice.length) return ['Sem Escolha'];
  return studentChoice;
};

const checkStudentChoice = (answer, choices) => {
  const studentChoice = getStudentChoice(choices);
  if (studentChoice[0] === 'Sem Escolha') return 'Incorreta';

  const correctAnswer = answer
    .map((item, index) => (item.is_correct ? index + 1 : null))
    .filter(Boolean);

  const wrongStudentChoices = studentChoice.filter(
    (item) => !correctAnswer.includes(item)
  );

  if (wrongStudentChoices.length === studentChoice.length) return 'Incorreta';
  if (wrongStudentChoices.length === 0) return 'Correta';
  return 'Parcialmente Correta';
};

const AccordionWrapper = ({ quizData }) => (
  <>
    {quizData.map((question, index) => (
      <Accordion key={question.id} TransitionProps={{ unmountOnExit: true }}>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls={`panel${index}bh-content`}
          id={`panel${index}bh-header`}
        >
          <Typography>
            {index + 1}.{`  ${question.title}`}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <AnswerWrapper>
            {question.answer.map((answer, i) => (
              <AnswerItem correct={answer.is_correct} key={answer.id}>
                <AnswerTitle>
                  {i + 1}.{`  ${answer.title}`}
                </AnswerTitle>
                <AnswerNumberOfChoices>
                  {answer.numberOfChoices}
                </AnswerNumberOfChoices>
              </AnswerItem>
            ))}
          </AnswerWrapper>

          <WrapperResumeOfQuestion>
            <HeaderTitle>Resumo</HeaderTitle>

            <WrapperResumeQuestion>
              <TextTitleResumeOfQuestion>
                Percentual de acerto:
              </TextTitleResumeOfQuestion>
              <CircularProgressWithLabel
                value={parseInt(question.percentageOfHit, 10)}
              />
            </WrapperResumeQuestion>
            <WrapperResumeQuestion>
              <TextTitleResumeOfQuestion>
                Tempo médio de resposta:
              </TextTitleResumeOfQuestion>
              <TextValueResumeOfQuestion>
                {question.avgOfTimeSpentToAnswer} segundos
              </TextValueResumeOfQuestion>
            </WrapperResumeQuestion>
          </WrapperResumeOfQuestion>

          <StudentWrapper>
            <HeaderTitle>Respostas</HeaderTitle>
            {question.question_choice.map((choice) => (
              <StudentInformation key={choice.student_quiz_id}>
                <BoxStudent>
                  <NameStudent>{choice.student.name}</NameStudent>
                  <ChoiceStudent>
                    Escolhas: {getStudentChoice(choice).map((item) => item)}
                  </ChoiceStudent>
                </BoxStudent>
                <IsStudentChoiceCorrect>
                  {checkStudentChoice(question.answer, choice)}
                </IsStudentChoiceCorrect>
              </StudentInformation>
            ))}
          </StudentWrapper>
        </AccordionDetails>
      </Accordion>
    ))}
  </>
);

export default AccordionWrapper;

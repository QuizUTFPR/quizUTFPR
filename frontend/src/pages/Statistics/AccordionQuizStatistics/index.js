import React from 'react';

// COMPONENTS
import {
  Accordion,
  AccordionDetails,
  Typography,
  Divider,
} from '@material-ui/core';
import Tooltip from '@components/ToolTip';
import CircularProgressWithLabel from '@components/CircularProgressWithLabel';

// ICONS
import {
  ExpandMore,
  CheckCircle,
  Cancel,
  SentimentSatisfied,
} from '@material-ui/icons';

// STYLES
import {
  StudentWrapper,
  StudentInformation,
  AnswerNumberOfChoices,
  NameStudent,
  ChoiceStudent,
  IsStudentChoiceCorrect,
  BoxStudent,
  WrapperResumeOfQuestion,
  WrapperResumeQuestion,
  TextTitleResumeOfQuestion,
  TextValueResumeOfQuestion,
  QuizPercentageHit,
  QuizPercentageHitDescription,
} from './style';

import {
  StyledAccordionSummary,
  AnswerItem,
  AnswerWrapper,
  AnswerTitle,
  HeaderTitle,
} from '../style';

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
  if (studentChoice[0] === 'Sem Escolha')
    return (
      <Tooltip arrow ariaLabel="errada" title="Questão errada">
        <Cancel color="error" fontSize="large" />
      </Tooltip>
    );

  const correctAnswer = answer
    .map((item, index) => (item.is_correct ? index + 1 : null))
    .filter(Boolean);

  const wrongStudentChoices = studentChoice.filter(
    (item) => !correctAnswer.includes(item)
  );

  if (wrongStudentChoices.length === studentChoice.length)
    return (
      <Tooltip arrow ariaLabel="errada" title="Questão errada">
        <Cancel color="error" fontSize="large" />
      </Tooltip>
    );
  if (wrongStudentChoices.length === 0)
    return (
      <Tooltip arrow ariaLabel="correto" title="Questão correta">
        <CheckCircle style={{ color: 'green' }} fontSize="large" />
      </Tooltip>
    );
  return (
    <Tooltip arrow ariaLabel="parcial" title="Parcialmente Correta">
      <SentimentSatisfied style={{ color: 'green' }} fontSize="large" />
    </Tooltip>
  );
};

const AccordionWrapper = ({ quizData }) => {
  const { questions, percentageOfQuizHit, quiz } = quizData;
  return (
    <>
      <QuizPercentageHit>
        <CircularProgressWithLabel
          size={100}
          styleText={{
            fontSize: '2em',
            fontWeight: 'bolder',
          }}
          color="yellow"
          value={parseInt(percentageOfQuizHit, 10)}
        />
        <QuizPercentageHitDescription>
          Esta porcentagem é relacionada a quantidade de acertos que os
          estudantes obterem em sua tentativa de maior score. <br />
          Compartilhe o PIN ({quiz.pin}) para mais alunos responderem seu quiz.
        </QuizPercentageHitDescription>
      </QuizPercentageHit>
      {questions.map((question, index) => (
        <Accordion key={question.id} TransitionProps={{ unmountOnExit: true }}>
          <StyledAccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls={`panel${index}bh-content`}
            id={`panel${index}bh-header`}
          >
            <Typography>
              {index + 1}.{`  ${question.title}`}
            </Typography>
          </StyledAccordionSummary>
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
                  Percentual de acerto
                </TextTitleResumeOfQuestion>
                <CircularProgressWithLabel
                  color="yellow"
                  value={parseInt(question.percentageOfHit, 10)}
                />
              </WrapperResumeQuestion>
              <Divider />
              <WrapperResumeQuestion>
                <TextTitleResumeOfQuestion>
                  Tempo médio de resposta
                </TextTitleResumeOfQuestion>
                <TextValueResumeOfQuestion>
                  {question.avgOfTimeSpentToAnswer} segundos
                </TextValueResumeOfQuestion>
              </WrapperResumeQuestion>
              <Divider />
              <WrapperResumeQuestion>
                <TextTitleResumeOfQuestion>
                  Quantidade de jogadores
                </TextTitleResumeOfQuestion>
                <TextValueResumeOfQuestion>
                  {question.question_choice.length}
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
                      Alternativas escolhidas:{' '}
                      {getStudentChoice(choice).map((item) => item)}
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
};

export default AccordionWrapper;

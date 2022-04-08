import React from 'react';
import Chart from 'react-apexcharts';

// COMPONENTS
import {
  Accordion,
  AccordionDetails,
  Typography,
  Divider,
} from '@mui/material';
import Tooltip from '@components/ToolTip';
import CircularProgressWithLabel from '@components/CircularProgressWithLabel';

// ICONS
import {
  ExpandMore,
  CheckCircle,
  Cancel,
  // SentimentSatisfied,
} from '@mui/icons-material';

// STYLES
import {
  StudentWrapper,
  StudentInformation,
  AnswerNumberOfChoices,
  BoldText,
  WrapperStudentChoice,
  StudentName,
  BadgeStudentChoice,
  IsStudentChoiceCorrect,
  BoxStudent,
  QuizPercentageHit,
  QuizPercentageHitDescription,
  BarQuestion,
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

const getStudentChoice = (answer, choice) => {
  const studentChoice = [];

  if (choice.checked1) studentChoice.push(answer[0].title);
  if (choice.checked2) studentChoice.push(answer[1].title);
  if (choice.checked3) studentChoice.push(answer[2].title);
  if (choice.checked4) studentChoice.push(answer[3].title);

  if (!studentChoice.length) return ['Sem Escolha'];
  return studentChoice;
};

const checkStudentChoice = (answer, choices) => {
  const studentChoice = getStudentChoice(answer, choices);

  if (studentChoice[0] === 'Sem Escolha')
    return (
      <Tooltip arrow ariaLabel="errada" title="Questão errada">
        <Cancel color="error" fontSize="large" />
      </Tooltip>
    );

  const correctAnswer = answer
    .map((item) => (item.isCorrect ? item.title : null))
    .filter(Boolean);

  const wrongStudentChoices = studentChoice.filter(
    (item) => !correctAnswer.includes(item)
  );

  if (wrongStudentChoices.length === 0)
    return (
      <Tooltip arrow ariaLabel="correto" title="Questão correta">
        <CheckCircle style={{ color: 'green' }} fontSize="large" />
      </Tooltip>
    );

  return (
    <Tooltip arrow ariaLabel="errada" title="Questão errada">
      <Cancel color="error" fontSize="large" />
    </Tooltip>
  );
  // return (
  //   <Tooltip arrow ariaLabel="parcial" title="Parcialmente Correta">
  //     <SentimentSatisfied style={{ color: 'green' }} fontSize="large" />
  //   </Tooltip>
  // );
};

const AccordionWrapper = ({ quizData, quizPin }) => {
  const {
    questions = [],
    percentageOfQuizHit,
    quiz,
    countOfEachPorcentage = [],
  } = quizData;

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
        categories: countOfEachPorcentage.map((item) => `${item[0]}%`),
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
      {questions[0]?.questionChoice.length === 0 && (
        <QuizPercentageHitDescription>
          Seu Quiz não foi respondido por nenhum aluno até o momento. <br />
          Compartilhe seu Quiz utilizando o seguinte PIN {quizPin}
        </QuizPercentageHitDescription>
      )}

      {questions[0]?.questionChoice.length > 0 && (
        <QuizPercentageHit>
          {/* <CircularProgressWithLabel
            size={100}
            styleText={{
              fontSize: '2em',
              fontWeight: 'bolder',
            }}
            value={parseInt(percentageOfQuizHit, 10)}
          /> */}

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

      {questions[0]?.questionChoice.length > 0 &&
        questions.map((question, index) => (
          <Accordion
            key={question.id}
            TransitionProps={{ unmountOnExit: true }}
          >
            <StyledAccordionSummary
              expandIcon={<ExpandMore />}
              aria-controls={`panel${index}bh-content`}
              id={`panel${index}bh-header`}
            >
              <BarQuestion>
                <Typography>
                  {index + 1}.{`  ${question.title}`}
                </Typography>
                <CircularProgressWithLabel
                  value={parseInt(question.percentageOfHit, 10)}
                />
              </BarQuestion>
            </StyledAccordionSummary>
            <AccordionDetails>
              <AnswerWrapper>
                {question.answer.map((answer, i) => (
                  <AnswerItem correct={answer.isCorrect} key={answer.id}>
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
                    {question.questionChoice.length}
                  </TextValueResumeOfQuestion>
                </WrapperResumeQuestion>
              </WrapperResumeOfQuestion>

              <StudentWrapper>
                <HeaderTitle>Respostas</HeaderTitle>
                {question.questionChoice.map((choice) => (
                  <StudentInformation key={choice.studentQuizId}>
                    <BoxStudent>
                      <BoldText>Aluno: </BoldText>
                      <StudentName>{choice.student.name}</StudentName>
                      <WrapperStudentChoice>
                        <BoldText>Alternativas Escolhidas</BoldText>
                        {getStudentChoice(question.answer, choice).map(
                          (item) => (
                            <BadgeStudentChoice key={item}>
                              {item}
                            </BadgeStudentChoice>
                          )
                        )}
                      </WrapperStudentChoice>
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

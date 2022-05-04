import React from 'react';

// COMPONENTS
import { Accordion, AccordionDetails, Typography } from '@mui/material';
import Tooltip from '@components/ToolTip';

// ICONS
import { ExpandMore } from '@mui/icons-material';

// STYLES
import { BarQuestion } from './style';
import { StyledAccordionSummary, TextStrongBold } from '../style';

// PAGES
import GeneralInfo from './components/GeneralInfo';
import HowToSeeStatistics from './components/HowToSeeStatistics';
import QuestionAnalyses from './components/QuestionAnalyses';
import StudentAnalyses from './components/StudentAnalyses';

const QuizStatisticsFAQ = () => {
  return (
    <>
      <Accordion TransitionProps={{ unmountOnExit: true }}>
        <StyledAccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel-bh-content"
          id="panel-bh-header"
        >
          <BarQuestion>
            <Typography>Informações Gerais</Typography>
          </BarQuestion>
        </StyledAccordionSummary>
        <AccordionDetails>
          <GeneralInfo />
        </AccordionDetails>
      </Accordion>

      <Accordion TransitionProps={{ unmountOnExit: true }}>
        <StyledAccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel-bh-content"
          id="panel-bh-header"
        >
          <BarQuestion>
            <Typography>Como posso ver as estatísticas dos Quizzes?</Typography>
          </BarQuestion>
        </StyledAccordionSummary>
        <AccordionDetails>
          <HowToSeeStatistics />
        </AccordionDetails>
      </Accordion>

      <Accordion TransitionProps={{ unmountOnExit: true }}>
        <StyledAccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel-bh-content"
          id="panel-bh-header"
        >
          <BarQuestion>
            <Typography>
              Como funciona a{' '}
              <TextStrongBold>análise por questões</TextStrongBold>?
            </Typography>
          </BarQuestion>
        </StyledAccordionSummary>
        <AccordionDetails>
          <QuestionAnalyses />
        </AccordionDetails>
      </Accordion>

      <Accordion TransitionProps={{ unmountOnExit: true }}>
        <StyledAccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel-bh-content"
          id="panel-bh-header"
        >
          <BarQuestion>
            <Typography>
              Como funciona a{' '}
              <TextStrongBold>análise por alunos</TextStrongBold>?
            </Typography>
          </BarQuestion>
        </StyledAccordionSummary>
        <AccordionDetails>
          <StudentAnalyses />
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default QuizStatisticsFAQ;

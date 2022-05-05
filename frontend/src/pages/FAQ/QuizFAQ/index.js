import React from 'react';

// COMPONENTS
import { Accordion, AccordionDetails, Typography } from '@mui/material';
import Tooltip from '@components/ToolTip';

// ICONS
import { ExpandMore } from '@mui/icons-material';

// STYLES
import { BarQuestion } from './style';
import { StyledAccordionSummary, TextStrongBold } from '../style';

// COMPONENTS
import GeneralInfo from './components/GeneralInfo';
import HowToCreate from './components/HowToCreate';
import HowToEdit from './components/HowToEdit';
import HowToDelete from './components/HowToDelete';
import HowToPublish from './components/HowToPublish';
import HowStudentAccessQuizViaPin from './components/HowStudentAccessQuizViaPin';

const QuizFAQ = () => {
  return (
    <>
      <Accordion TransitionProps={{ unmountOnExit: true }}>
        <StyledAccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel-bh-content"
          id="panel-bh-header"
        >
          <BarQuestion>
            <Typography>Informações gerais</Typography>
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
            <Typography>
              Como faço para <TextStrongBold>criar</TextStrongBold> um quiz?
            </Typography>
          </BarQuestion>
        </StyledAccordionSummary>
        <AccordionDetails>
          <HowToCreate />
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
              Como <TextStrongBold>editar</TextStrongBold> um quiz?
            </Typography>
          </BarQuestion>
        </StyledAccordionSummary>
        <AccordionDetails>
          <HowToEdit />
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
              Como <TextStrongBold>deletar</TextStrongBold> um quiz?
            </Typography>
          </BarQuestion>
        </StyledAccordionSummary>
        <AccordionDetails>
          <HowToDelete />
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
              Como <TextStrongBold>publicar</TextStrongBold> um quiz?
            </Typography>
          </BarQuestion>
        </StyledAccordionSummary>
        <AccordionDetails>
          <HowToPublish />
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
              Como os alunos{' '}
              <TextStrongBold>acessam o quiz via PIN?</TextStrongBold>
            </Typography>
          </BarQuestion>
        </StyledAccordionSummary>
        <AccordionDetails>
          <HowStudentAccessQuizViaPin />
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default QuizFAQ;

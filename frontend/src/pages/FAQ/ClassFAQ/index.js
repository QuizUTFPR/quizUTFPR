import React from 'react';

// COMPONENTS
import { Accordion, AccordionDetails, Typography } from '@mui/material';
import Tooltip from '@components/ToolTip';

// ICONS
import { ExpandMore } from '@mui/icons-material';

// STYLES
import {
  AccordionGrid,
  TextStrongBold,
  StyledAccordionSummary,
} from '../style';

// COMPONENTS
import GeneralInfo from './components/GeneralInfo';
import HowToCreate from './components/HowToCreate';
import HowToEdit from './components/HowToEdit';
import HowToClone from './components/HowToClone';
import HowToAppendQuiz from './components/HowToAppendQuiz';
import HowToDelete from './components/HowToDelete';

const QuestionFAQ = () => {
  return (
    <>
      <Accordion TransitionProps={{ unmountOnExit: true }}>
        <StyledAccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel-bh-content"
          id="panel-bh-header"
        >
          <AccordionGrid>
            <Typography>Informações gerais</Typography>
          </AccordionGrid>
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
          <AccordionGrid>
            <Typography>
              Como faço para <TextStrongBold>criar</TextStrongBold> uma Turma?
            </Typography>
          </AccordionGrid>
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
          <AccordionGrid>
            <Typography>
              Como faço para <TextStrongBold>editar</TextStrongBold> uma Turma?
            </Typography>
          </AccordionGrid>
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
          <AccordionGrid>
            <Typography>
              Como faço para <TextStrongBold>clonar</TextStrongBold> uma Turma?
            </Typography>
          </AccordionGrid>
        </StyledAccordionSummary>
        <AccordionDetails>
          <HowToClone />
        </AccordionDetails>
      </Accordion>

      <Accordion TransitionProps={{ unmountOnExit: true }}>
        <StyledAccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel-bh-content"
          id="panel-bh-header"
        >
          <AccordionGrid>
            <Typography>
              Como faço para <TextStrongBold>remover</TextStrongBold> uma Turma?
            </Typography>
          </AccordionGrid>
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
          <AccordionGrid>
            <Typography>
              Como faço para <TextStrongBold>vincular quizzes</TextStrongBold>{' '}
              em uma Turma?
            </Typography>
          </AccordionGrid>
        </StyledAccordionSummary>
        <AccordionDetails>
          <HowToAppendQuiz />
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default QuestionFAQ;

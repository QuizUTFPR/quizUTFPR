import React from 'react';

// COMPONENTS
import { Accordion, AccordionDetails, Typography } from '@mui/material';

// ICONS
import { ExpandMore } from '@mui/icons-material';

// COMPONENTS
import HowToCreate from './components/HowToCreate';
import HowToUseLatex from './components/HowToUseLatex';
import HowToUseQuestionDatabase from './components/HowToUseQuestionDatabase';
import GeneralInfo from './components/GeneralInfo';
import HowToChangeOrder from './components/HowToChangeOrder';
import HowToImportSheet from './components/HowToImportSheet';

// STYLES
import { BarQuestion } from './style';
import { StyledAccordionSummary, TextStrongBold } from '../style';

const QuestionFAQ = () => {
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
              Como faço para <TextStrongBold>criar</TextStrongBold> uma questão?
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
              Como usar <TextStrongBold>LaTeX</TextStrongBold> nas questões?
            </Typography>
          </BarQuestion>
        </StyledAccordionSummary>
        <AccordionDetails>
          <HowToUseLatex />
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
              Como <TextStrongBold>adicionar</TextStrongBold> uma questão do{' '}
              <TextStrongBold>banco de questões</TextStrongBold>?
            </Typography>
          </BarQuestion>
        </StyledAccordionSummary>
        <AccordionDetails>
          <HowToUseQuestionDatabase />
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
              Como criar novas questões baseadas em uma{' '}
              <TextStrongBold> planilha de questões</TextStrongBold>?
            </Typography>
          </BarQuestion>
        </StyledAccordionSummary>
        <AccordionDetails>
          <HowToImportSheet />
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
              Como <TextStrongBold>mudar a ordem</TextStrongBold> das questões?
            </Typography>
          </BarQuestion>
        </StyledAccordionSummary>
        <AccordionDetails>
          <HowToChangeOrder />
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default QuestionFAQ;

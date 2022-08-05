import React from 'react';

// COMPONENTS
import { Accordion, AccordionDetails, Typography } from '@mui/material';
import Tooltip from '@components/ToolTip';

// ICONS
import { ExpandMore } from '@mui/icons-material';

// STYLES
import { BarQuestion } from './style';
import { StyledAccordionSummary } from '../style';

// PAGES
import HowToSeeStatistics from './components/HowToSeeStatistics';
import GeneralInfo from './components/GeneralInfo';

const ClassStatisticsFAQ = () => {
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
            <Typography>Como posso ver as estatísticas das Turmas?</Typography>
          </BarQuestion>
        </StyledAccordionSummary>
        <AccordionDetails>
          <HowToSeeStatistics />
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default ClassStatisticsFAQ;

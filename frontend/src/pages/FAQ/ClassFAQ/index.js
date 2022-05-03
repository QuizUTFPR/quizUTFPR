import React from 'react';

// COMPONENTS
import { Accordion, AccordionDetails, Typography } from '@mui/material';
import Tooltip from '@components/ToolTip';

// ICONS
import { ExpandMore } from '@mui/icons-material';

// STYLES
import { BarQuestion } from './style';
import { StyledAccordionSummary } from '../style';

const QuestionFAQ = () => {
  return (
    <Accordion TransitionProps={{ unmountOnExit: true }}>
      <StyledAccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls="panel-bh-content"
        id="panel-bh-header"
      >
        <BarQuestion>
          <Typography>Como faço para criar uma turma?</Typography>
        </BarQuestion>
      </StyledAccordionSummary>
      <AccordionDetails>teste</AccordionDetails>
    </Accordion>
  );
};

export default QuestionFAQ;

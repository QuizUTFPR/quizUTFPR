import React, { useState } from 'react';

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  // Collapse,
  Typography,
} from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';

const AccordionWrapper = () => {
  // const accordionRef = useRef(null);
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Accordion
      expanded={expanded === 'panel1'}
      onChange={handleChange('panel1')}
      TransitionProps={{ unmountOnExit: true }}
    >
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls="panel1bh-content"
        id="panel1bh-header"
      >
        <Typography>General settings</Typography>
        <Typography>I am an accordion</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat.
          Aliquam eget maximus est, id dignissim quam.
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
};

export default AccordionWrapper;

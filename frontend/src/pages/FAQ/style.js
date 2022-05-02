import styled from 'styled-components';

import { Typography, AccordionSummary } from '@mui/material';

export const TitlePage = styled(Typography)`
  overflow: hidden;
  text-align: center;
`;

export const TitleWrapper = styled.div`
  flex-grow: 1;
`;

export const StyledAccordionSummary = styled(AccordionSummary)`
  margin-bottom: 15px;
  border-radius: 5px;
  border: 1px solid gray;
`;

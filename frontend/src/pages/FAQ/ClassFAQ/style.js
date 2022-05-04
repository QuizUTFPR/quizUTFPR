import styled from 'styled-components';

import { Grid, Typography } from '@mui/material';

export const AccordionGrid = styled(Grid).attrs({
  item: true,
})`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const StyledTypography = styled(Typography).attrs({
  variant: 'h5',
})`
  margin-top: 15px;
  font-weight: 500;

  &:first-child {
    margin-top: 0px;
  }
`;

export const StyledParagraph = styled.p`
  text-align: center;
`;

export const TextBold = styled.span`
  font-weight: 500;
`;

export const TextStrongBold = styled.span`
  font-weight: bolder;
`;

export const StyledFigure = styled.figure`
  margin: 30px 0;
  border: thin #c0c0c0 solid;
  display: flex;
  flex-flow: column;
  padding: 5px;
`;

export const StyledFigureCaption = styled.figcaption`
  background-color: #222;
  color: #fff;
  font: italic smaller sans-serif;
  padding: 3px;
  text-align: center;
`;

export const StyledImg = styled.img`
  max-width: 100%;
  text-align: center;
`;

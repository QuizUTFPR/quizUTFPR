import styled from "styled-components";

import { Card, CardMedia, CardContent, CardActions } from "@material-ui/core";

export const StyledCard = styled(Card)`
  display: flex;
`;

export const StyledCardMedia = styled(CardMedia)`
  width: 20%;
  height: 140px;
`;

export const StyledCardContent = styled(CardContent)`
  flex-basis: 0;
  flex-grow: 1;
  flex-shrink: 1;
`;

export const StyledCardActions = styled(CardActions)`
  && {
    button span {
      color: ${({ theme }) => theme.palette.primary.main};
    }
  }
`;

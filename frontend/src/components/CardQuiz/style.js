import styled from 'styled-components';

import { Card, CardMedia, CardContent, CardActions } from '@material-ui/core';

export const StyledCard = styled(Card)`
  display: flex;
  height: 150px;
  margin-bottom: 20px;
`;

export const StyledCardMedia = styled(CardMedia)`
  width: 200px;
`;

export const EmptyImage = styled.div`
  width: 390px;
  height: 150px;
  background: ${({ theme }) => theme.palette.primary.main};
`;

export const StyledCardContent = styled(CardContent)`
  display: flex;
  flex-basis: 0;
  flex-grow: 1;
  flex-shrink: 1;
  flex-direction: column;
`;

export const StyledCardActions = styled(CardActions)`
  && {
    button span {
      color: ${({ theme }) => theme.palette.primary.main};
    }
  }
`;

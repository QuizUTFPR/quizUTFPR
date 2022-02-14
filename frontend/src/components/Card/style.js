import styled from 'styled-components';

import {
  Card,
  CardMedia,
  CardActions,
  CardActionArea,
  Typography,
} from '@mui/material';

export const StyledCard = styled(Card)`
  display: flex;
  height: 150px;
  margin-bottom: 20px;
  align-items: center;
  width: 100%;
  justify-content: space-between;
`;

export const WrapperContentCard = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

export const StyledCardActionArea = styled(CardActionArea)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 100%;
  padding-left: 10px;
`;

export const StyledCardMedia = styled(CardMedia)`
  width: 200px;
  height: 100%;
`;

export const EmptyImage = styled.div`
  flex-shrink: 0;
  height: 100%;
  width: 200px;
  background: ${({ theme }) => theme.palette.primary.main};
`;

export const StyledCardActions = styled(CardActions)`
  && {
    button span {
      color: ${({ theme }) => theme.palette.primary.main};
    }
  }
`;

export const TitleCard = styled(Typography)`
  width: 100%;
  font-size: 1.2rem;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const DescriptionCard = styled(Typography)`
  width: 100%;
  font-size: 1rem;
  font-weight: 400;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

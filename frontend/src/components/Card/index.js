import React from 'react';

import { Typography, CardActionArea } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { QUESTION } from '@routes';
import {
  StyledCard,
  StyledCardMedia,
  StyledCardContent,
  StyledCardActions,
} from './style';

const Card = ({ image, imageTitle, title, description, children }) => (
  <StyledCard>
    <StyledCardMedia component="img" image={image} title={imageTitle} />
    <CardActionArea component={Link} to={QUESTION}>
      <StyledCardContent>
        <Typography color="primary" component="h5" variant="h5">
          {title}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          {description}
        </Typography>
      </StyledCardContent>
    </CardActionArea>
    <StyledCardActions>{children}</StyledCardActions>
  </StyledCard>
);

export default Card;

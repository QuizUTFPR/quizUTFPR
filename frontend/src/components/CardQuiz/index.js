import React from 'react';
import PropTypes from 'prop-types';

import { Typography, CardActionArea } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { QUESTION } from '@routes';
import {
  StyledCard,
  StyledCardMedia,
  StyledCardContent,
  StyledCardActions,
} from './style';

const Card = ({
  image,
  imageTitle,
  title,
  published,
  description,
  idQuiz,
  children,
}) => (
  <StyledCard>
    <StyledCardMedia component="img" image={image} title={imageTitle} />
    <CardActionArea
      component={Link}
      to={{
        pathname: `${QUESTION}${idQuiz}`,
        state: { title, published },
      }}
    >
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

Card.defaultProps = {
  imageTitle: 'Título da Image',
  description: 'Descrição',
  title: 'Título do Quiz',
  children: <></>,
};

Card.propTypes = {
  image: PropTypes.string.isRequired,
  imageTitle: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  idQuiz: PropTypes.number.isRequired,
  children: PropTypes.node,
};

export default Card;

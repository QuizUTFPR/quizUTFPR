import React from 'react';
import PropTypes from 'prop-types';

import { Typography, CardActionArea } from '@mui/material';
import { Link } from 'react-router-dom';
import { QUESTION } from '@routes';
import {
  StyledCard,
  StyledCardMedia,
  StyledCardContent,
  StyledCardActions,
  EmptyImage,
} from './style';

const Card = ({
  image,
  imageTitle,
  noTime,
  title,
  published,
  description,
  idQuiz,
  children,
}) => (
  <StyledCard>
    {image ? (
      <StyledCardMedia component="img" image={image} title={imageTitle} />
    ) : (
      <EmptyImage />
    )}
    <CardActionArea
      component={Link}
      to={`${QUESTION}${idQuiz}`}
      state={{ title, published, noTime }}
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
  image: '',
  // eslint-disable-next-line react/jsx-no-useless-fragment
  children: <></>,
};

Card.propTypes = {
  image: PropTypes.string,
  imageTitle: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  idQuiz: PropTypes.string.isRequired,
  children: PropTypes.node,
};

export default Card;

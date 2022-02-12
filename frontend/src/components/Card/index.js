import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// MATERIAL-UI COMPONENTS
import { Typography, CardActionArea } from '@mui/material';

// STYLE
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
  title,
  description,
  to,
  children,
  ...props
}) => (
  <StyledCard>
    {image ? (
      <StyledCardMedia component="img" image={image} title={imageTitle} />
    ) : (
      <EmptyImage />
    )}
    <CardActionArea component={Link} to={to} state={{ title, ...props }}>
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
  title: 'Título',
  image: '',
  // eslint-disable-next-line react/jsx-no-useless-fragment
  children: <></>,
};

Card.propTypes = {
  image: PropTypes.string,
  imageTitle: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  to: PropTypes.string.isRequired,
  children: PropTypes.node,
};

export default Card;

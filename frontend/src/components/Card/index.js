import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// MATERIAL-UI COMPONENTS
import { Typography, CardActionArea } from '@mui/material';

// STYLE
import {
  StyledCard,
  StyledCardMedia,
  StyledCardActions,
  EmptyImage,
  WrapperContentCard,
  StyledCardActionArea,
  TitleCard,
  DescriptionCard,
} from './style';

const Card = ({
  image,
  imageTitle,
  title,
  description,
  to,
  children,
  ...props
}) => {
  return (
    <StyledCard>
      {image ? (
        <StyledCardMedia component="img" image={image} title={imageTitle} />
      ) : (
        <EmptyImage />
      )}
      <WrapperContentCard>
        <StyledCardActionArea
          component={Link}
          to={to}
          state={{ title, ...props }}
        >
          <TitleCard noWrap color="primary">
            {title}
          </TitleCard>
          <DescriptionCard noWrap color="textSecondary">
            {description}
          </DescriptionCard>
        </StyledCardActionArea>
      </WrapperContentCard>
      <StyledCardActions>{children}</StyledCardActions>
    </StyledCard>
  );
};

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

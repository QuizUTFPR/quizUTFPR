import React from "react";
import {
  StyledCard,
  StyledCardMedia,
  StyledCardContent,
  StyledCardActions
} from "./style";

import { Typography } from "@material-ui/core";

const Card = ({ image, imageTitle, title, description, children }) => {
  return (
    <StyledCard>
      <StyledCardMedia image={image} title={imageTitle} />
      <StyledCardContent>
        <Typography color="primary" component="h5" variant="h5">
          {title}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          {description}
        </Typography>
      </StyledCardContent>
      <StyledCardActions>{children}</StyledCardActions>
    </StyledCard>
  );
};

export default Card;

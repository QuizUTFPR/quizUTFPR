import React from 'react';

// STYLES
import {
  Container,
  BloobsBackground,
  ImageView,
  StyledLoginIllustration,
} from './styles';

const InitialScreen = () => (
  <Container>
    <BloobsBackground fill={'white'} />
    <ImageView>
      <StyledLoginIllustration />
    </ImageView>
  </Container>
);

export default InitialScreen;

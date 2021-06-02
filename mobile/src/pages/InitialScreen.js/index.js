import React from 'react';

// STYLES
import {
  Container,
  BloobsBackground,
  ImageView,
  StyledLoginIllustration,
} from './styles';

const InitialScreen = () => {
  return (
    <Container>
      <BloobsBackground fill={'#fff'} />
      <ImageView>
        <StyledLoginIllustration />
      </ImageView>
    </Container>
  );
};

export default InitialScreen;

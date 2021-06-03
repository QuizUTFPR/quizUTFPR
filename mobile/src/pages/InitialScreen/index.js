import React from 'react';
import Button from '@components/Button';
import { useTheme } from 'react-native-paper';

// STYLES
import {
  Container,
  BloobsBackground,
  ImageView,
  StyledLoginIllustration,
  WrapperButton,
  StyledTitle,
  StyledParagraph,
} from './styles';

const InitialScreen = () => {
  const { label } = useTheme();

  return (
    <Container>
      <BloobsBackground fill={'white'} />
      <ImageView>
        <StyledLoginIllustration />

        <StyledTitle color="primary" fontSize={label.fontSize}>
          BEM VINDO!
        </StyledTitle>
        <StyledParagraph color="primary" fontSize={label.fontSize}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.{' '}
        </StyledParagraph>

        <WrapperButton>
          <Button icon="login">ENTRAR</Button>
        </WrapperButton>
        <WrapperButton>
          <Button icon="adduser">CRIAR CONTA</Button>
        </WrapperButton>
      </ImageView>
    </Container>
  );
};

export default InitialScreen;

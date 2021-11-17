import React from 'react';

// STYLES
import { StyledIconButton, StyledTitle, StyledText } from './styles';

const Login = ({
  iconButton,
  buttonSize,
  onPressButton,
  titleContent,
  textContent,
}) => (
  <>
    <StyledIconButton size={buttonSize} onPress={onPressButton}>
      {iconButton}
    </StyledIconButton>

    <StyledTitle>{titleContent}</StyledTitle>

    <StyledText>{textContent}</StyledText>
  </>
);

export default Login;

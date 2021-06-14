import React from 'react';

// STYLES
import { StyledIconButton, StyledTitle, StyledText } from './styles';

const Login = ({
  buttonColor,
  iconButton,
  buttonSize,
  onPressButton,
  titleContent,
  textContent,
}) => (
  <>
    {/* <StyledIconButton
      color={buttonColor}
      icon={iconButton}
      size={buttonSize}
      onPress={onPressButton}
    /> */}

    <StyledTitle>{titleContent}</StyledTitle>

    <StyledText>{textContent}</StyledText>
  </>
);

export default Login;

import React from 'react';

// STYLES
import { StyledIconButton, StyledTitle, StyledText } from './styles';

const Login = ({
  buttonColor,
  iconButton,
  buttonSize,
  onPressButton,
  fontSize,
  titleContent,
  textContent,
}) => {
  return (
    <>
      <StyledIconButton
        color={buttonColor}
        icon={iconButton}
        size={buttonSize}
        onPress={onPressButton}
      />

      <StyledTitle fontSize={fontSize}>{titleContent}</StyledTitle>

      <StyledText fontSize={fontSize}>{textContent}</StyledText>
    </>
  );
};

export default Login;

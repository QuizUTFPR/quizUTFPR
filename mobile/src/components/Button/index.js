import React from 'react';
import styled from 'styled-components/native';
import { TouchableOpacity, Text } from 'react-native';
import { useTheme } from 'react-native-paper';

const StyledButton = styled(TouchableOpacity)`
  display: flex;
  align-items: center;
  height: 60px;
  display: flex;
  justify-content: center;
  background-color: ${(props) => props.color};
  border-radius: 5px;
`;

const StyledText = styled(Text)`
  color: white;
  font-family: 'RobotoBlack';
  font-size: ${({ fontSize }) => fontSize}px;
`;

const WrapperStyledButton = ({ children, ...props }) => {
  const { label } = useTheme();
  return (
    <StyledButton activeOpacity={0.9} color={props.color.toString()} {...props}>
      <StyledText fontSize={label.fontSize}>{children}</StyledText>
    </StyledButton>
  );
};

export default WrapperStyledButton;

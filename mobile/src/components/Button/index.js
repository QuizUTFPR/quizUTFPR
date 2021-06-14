import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';

export const StyledButton = styled.TouchableOpacity`
  height: 60px;
  background: ${({ theme }) => theme.color.background};
  justify-content: center;
  border-radius: 5px;
`;

export const StyledText = styled.Text`
  font-family: 'RobotoBold';
  font-size: ${({ theme }) => theme.fontSize}px;
  color: white;
  text-align: center; ;
`;

const WrapperStyledButton = ({
  children,
  onPress,
  activeOpacity,
  ...props
}) => (
  <StyledButton activeOpacity={activeOpacity} onPress={onPress} {...props}>
    <StyledText>{children}</StyledText>
  </StyledButton>
);

StyledButton.defaultProps = {
  onPress: () => {},
  activeOpacity: 0.9,
};

StyledButton.propTypes = {
  children: PropTypes.node.isRequired,
  onPress: PropTypes.func,
  activeOpacity: PropTypes.number,
};

export default WrapperStyledButton;

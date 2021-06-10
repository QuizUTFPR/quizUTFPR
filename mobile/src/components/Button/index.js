import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { Button } from 'react-native-paper';

export const StyledButton = styled(Button).attrs({
  labelStyle: {
    color: 'white',
  },
  contentStyle: {
    height: 60,
    iconSize: 60,
  },
})``;

const WrapperStyledButton = ({ children, onPress, mode, ...props }) => (
  <StyledButton mode={mode} onPress={onPress} {...props}>
    {children}
  </StyledButton>
);

StyledButton.defaultProps = {
  onPress: () => {},
  mode: 'contained',
};

StyledButton.propTypes = {
  children: PropTypes.node.isRequired,
  onPress: PropTypes.func,
  mode: PropTypes.string,
};

export default WrapperStyledButton;

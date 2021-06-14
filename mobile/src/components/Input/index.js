import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';

// STYLES
import { InputWrapper, StyledTextInput } from './styles';

const Input = ({ secureTextEntry, label, ...props }) => (
  <InputWrapper>
    <Text>{label}</Text>
    <StyledTextInput secureTextEntry={secureTextEntry} {...props} />
  </InputWrapper>
);

Input.defaultProps = {
  secureTextEntry: false,
};

Input.propTypes = {
  secureTextEntry: PropTypes.bool,
  label: PropTypes.string.isRequired,
};

export default Input;

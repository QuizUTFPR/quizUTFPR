import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';

// STYLES
import { InputWrapper, StyledTextInput } from './styles';

const Input = ({ secureTextEntry, labelText, mode, icon }) => (
  <InputWrapper>
    <StyledTextInput
      secureTextEntry={secureTextEntry}
      mode={mode}
      left={<Text.Icon name={icon} />}
      label={labelText}
    />
  </InputWrapper>
);

StyledTextInput.defaultProps = {
  secureTextEntry: false,
  mode: 'flat',
  icon: '',
  labelText: '',
};

StyledTextInput.propTypes = {
  secureTextEntry: PropTypes.bool,
  mode: PropTypes.string,
  icon: PropTypes.string,
  labelText: PropTypes.string.isRequired,
};

export default Input;

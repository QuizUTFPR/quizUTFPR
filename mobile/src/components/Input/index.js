import React from 'react';
import PropTypes from 'prop-types';
import { TextInput } from 'react-native-paper';

// STYLES
import { InputWrapper, StyledTextInput } from './styles';

const Input = ({ secureTextEntry, labelText, mode, icon }) => {
  return (
    <InputWrapper>
      <StyledTextInput
        secureTextEntry={secureTextEntry}
        mode={mode}
        left={<TextInput.Icon name={icon} />}
        label={labelText}
      />
    </InputWrapper>
  );
};

StyledTextInput.defaultProps = {
  secureTextEntry: false,
  mode: 'outlined',
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

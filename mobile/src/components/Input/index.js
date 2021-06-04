import React from 'react';
import PropTypes from 'prop-types';
import { useTheme, TextInput } from 'react-native-paper';

// STYLES
import { InputWrapper, StyledLabel, StyledTextInput } from './styles';

const Input = ({ secureTextEntry, labelText, mode, icon }) => {
  const { label } = useTheme();

  return (
    <InputWrapper>
      <StyledLabel fontSize={label.fontSize}>{labelText}</StyledLabel>
      <StyledTextInput
        secureTextEntry={secureTextEntry}
        mode={mode}
        left={<TextInput.Icon name={icon} />}
      />
    </InputWrapper>
  );
};

StyledLabel.defaultProps = {
  labelText: '',
};

StyledTextInput.defaultProps = {
  secureTextEntry: false,
  mode: 'outlined',
  icon: '',
};

StyledLabel.propTypes = {
  labelText: PropTypes.string,
};

StyledTextInput.propTypes = {
  secureTextEntry: PropTypes.bool,
  mode: PropTypes.string,
  icon: PropTypes.string,
};

export default Input;

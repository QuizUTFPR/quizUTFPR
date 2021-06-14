import React from 'react';
import PropTypes from 'prop-types';

// STYLES
import {
  InputWrapper,
  StyledTextInput,
  IconView,
  LabelWrapper,
  Label,
} from './styles';

const Input = ({
  secureTextEntry,
  label,
  icon,

  ...props
}) => (
  <InputWrapper>
    <IconView>{icon}</IconView>
    <LabelWrapper>
      <Label>{label}</Label>
      <StyledTextInput secureTextEntry={secureTextEntry} {...props} />
    </LabelWrapper>
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

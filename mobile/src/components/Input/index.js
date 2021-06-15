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
  error,
  errorMessage,
  label,
  icon,
  fill,
  ...props
}) => (
  <InputWrapper fill={fill} error={error}>
    <IconView>{icon}</IconView>
    <LabelWrapper>
      <Label fill={fill} error={error}>
        {label}
        {error && ` (${errorMessage})`}
      </Label>
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

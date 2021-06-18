import React from 'react';
import PropTypes from 'prop-types';

// STYLES
import {
  Wrapper,
  InputWrapper,
  StyledTextInput,
  IconView,
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
  <Wrapper>
    <Label fill={fill} error={error}>
      {label}
      {error && ` (${errorMessage})`}
    </Label>
    <InputWrapper fill={fill} error={error}>
      <IconView>{icon}</IconView>
      <StyledTextInput secureTextEntry={secureTextEntry} {...props} />
    </InputWrapper>
  </Wrapper>
);

Input.defaultProps = {
  secureTextEntry: false,
};

Input.propTypes = {
  secureTextEntry: PropTypes.bool,
  label: PropTypes.string.isRequired,
};

export default Input;

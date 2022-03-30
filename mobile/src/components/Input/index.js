import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Ionicons } from '@expo/vector-icons';

// STYLES
import {
  Wrapper,
  InputWrapper,
  StyledTextInput,
  IconView,
  Label,
  InputView,
  ShowPasswordView,
} from './styles';

const Input = ({
  secureTextEntry,
  error,
  errorMessage,
  label,
  icon,
  fill,
  height,
  paddingWrapper,
  ...props
}) => {
  const [isChecked, setChecked] = useState(false);

  const handleShowPassword = () => {
    setChecked(!isChecked);
  };

  return (
    <Wrapper>
      <Label fill={fill} error={error}>
        {label}
        {error && ` (${errorMessage})`}
      </Label>
      <InputWrapper
        fill={fill}
        error={error}
        height={height}
        paddingWrapper={paddingWrapper}
      >
        <InputView>
          <IconView>{icon}</IconView>
          <StyledTextInput
            secureTextEntry={isChecked ? false : secureTextEntry}
            {...props}
          />
        </InputView>
        {secureTextEntry && (
          <ShowPasswordView onPress={handleShowPassword}>
            <Ionicons
              name={isChecked ? 'eye-sharp' : 'eye-off-sharp'}
              size={25}
              color="black"
            />
          </ShowPasswordView>
        )}
      </InputWrapper>
    </Wrapper>
  );
};
Input.defaultProps = {
  secureTextEntry: false,
  height: '55px',
  paddingWrapper: '0px',
};

Input.propTypes = {
  secureTextEntry: PropTypes.bool,
  label: PropTypes.string.isRequired,
  height: PropTypes.string,
  paddingWrapper: PropTypes.string,
};

export default Input;

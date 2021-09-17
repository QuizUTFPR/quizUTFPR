import React from 'react';
import PropTypes from 'prop-types';

import { StyledButton, StyledText } from './style';

const WrapperStyledButton = ({
  children,
  onPress,
  variant,
  activeOpacity,
  ...props
}) => (
  <StyledButton
    variant={variant}
    activeOpacity={activeOpacity}
    onPress={onPress}
    {...props}
  >
    <StyledText variant={variant}>{children}</StyledText>
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

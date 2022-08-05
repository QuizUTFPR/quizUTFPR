import React from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator } from 'react-native';

import { StyledButton, StyledText } from './style';

const WrapperStyledButton = ({
  children,
  onPress,
  variant,
  activeOpacity,
  loading,
  ...props
}) => (
  <StyledButton
    variant={variant}
    activeOpacity={activeOpacity}
    onPress={onPress}
    disabled={loading}
    {...props}
  >
    {loading && (
      <ActivityIndicator
        style={{ marginRight: 20 }}
        size="small"
        color="white"
      />
    )}
    <StyledText variant={variant}>{children}</StyledText>
  </StyledButton>
);

StyledButton.defaultProps = {
  onPress: () => {},
  activeOpacity: 0.9,
  loading: false,
};

StyledButton.propTypes = {
  children: PropTypes.node.isRequired,
  onPress: PropTypes.func,
  activeOpacity: PropTypes.number,
  loading: PropTypes.bool,
};

export default WrapperStyledButton;

import React from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator } from 'react-native';

import { WrapperButton, StyledButton, StyledText } from './style';

// THEME
import theme from '../../styles/theme';

const WrapperStyledButton = ({
  children,
  onPress,
  mode,
  colors,
  variant,
  activeOpacity,
  underlayColor,
  loading,
  ...props
}) => (
  <WrapperButton
    onPress={onPress}
    underlayColor={underlayColor}
    activeOpacity={activeOpacity}
    disabled={loading}
  >
    <StyledButton colors={colors} {...props}>
      {loading && (
        <ActivityIndicator
          style={{ marginRight: 20 }}
          size="small"
          color="white"
        />
      )}
      <StyledText fill="white">{children}</StyledText>
    </StyledButton>
  </WrapperButton>
);

WrapperStyledButton.defaultProps = {
  onPress: () => {},
  activeOpacity: 0.7,
  underlayColor: theme.color.whiteGrey,
  colors: theme.color.gradients.primary,
  loading: false,
};

WrapperStyledButton.propTypes = {
  children: PropTypes.node.isRequired,
  onPress: PropTypes.func,
  activeOpacity: PropTypes.number,
  underlayColor: PropTypes.string,
  colors: PropTypes.arrayOf(PropTypes.string),
  loading: PropTypes.bool,
};

export default WrapperStyledButton;

import React from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator } from 'react-native';

import { WrapperButton, StyledButton, StyledText } from './style';

// THEME
import theme from '../../styles/theme';

const styleActivityIndicator = { marginRight: 20 };

const WrapperStyledButton = ({
  children,
  onPress,
  mode,
  colors,
  variant,
  activeOpacity,
  underlayColor,
  loading,
  title,
  ...props
}) => (
  <WrapperButton
    onPress={onPress}
    underlayColor={underlayColor}
    activeOpacity={activeOpacity}
    disabled={loading}
  >
    <StyledButton colors={colors} {...props}>
      {loading ? (
        <ActivityIndicator
          style={styleActivityIndicator}
          size="small"
          color="white"
        />
      ) : null}
      <StyledText fill="white">{title}</StyledText>
      {children}
    </StyledButton>
  </WrapperButton>
);

WrapperStyledButton.defaultProps = {
  onPress: () => {},
  activeOpacity: 0.7,
  underlayColor: theme.color.whiteGrey,
  colors: theme.color.gradients.primary,
  loading: false,
  children: '',
  title: 'title',
};

WrapperStyledButton.propTypes = {
  children: PropTypes.node,
  onPress: PropTypes.func,
  activeOpacity: PropTypes.number,
  underlayColor: PropTypes.string,
  colors: PropTypes.arrayOf(PropTypes.string),
  loading: PropTypes.bool,
  title: PropTypes.string,
};

export default WrapperStyledButton;

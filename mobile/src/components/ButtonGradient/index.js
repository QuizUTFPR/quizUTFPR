import React from 'react';
import PropTypes from 'prop-types';

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
  ...props
}) => (
  <WrapperButton
    onPress={onPress}
    underlayColor={underlayColor}
    activeOpacity={activeOpacity}
  >
    <StyledButton colors={colors} {...props}>
      <StyledText fill="white">{children}</StyledText>
    </StyledButton>
  </WrapperButton>
);

WrapperStyledButton.defaultProps = {
  onPress: () => {},
  activeOpacity: 0.7,
  underlayColor: theme.color.whiteGrey,
  colors: theme.color.gradients.purple,
};

WrapperStyledButton.propTypes = {
  children: PropTypes.node.isRequired,
  onPress: PropTypes.func,
  activeOpacity: PropTypes.number,
  underlayColor: PropTypes.string,
  colors: PropTypes.arrayOf(PropTypes.string),
};

export default WrapperStyledButton;

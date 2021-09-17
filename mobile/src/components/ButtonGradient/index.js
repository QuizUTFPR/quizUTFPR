import React from 'react';
import PropTypes from 'prop-types';

import { WrapperButton, StyledButton, StyledText } from './style';

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
  underlayColor: '#DDDDDD',
  colors: ['#4B24B1', '#3b1b96'],
};

WrapperStyledButton.propTypes = {
  children: PropTypes.node.isRequired,
  onPress: PropTypes.func,
  activeOpacity: PropTypes.number,
  underlayColor: PropTypes.string,
  colors: PropTypes.arrayOf(PropTypes.string),
};

export default WrapperStyledButton;

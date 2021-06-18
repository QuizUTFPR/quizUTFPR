import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';

export const WrapperButton = styled.TouchableOpacity``;

export const StyledButton = styled(LinearGradient)`
  height: 60px;
  justify-content: center;
  border-radius: 30px;
`;

export const StyledText = styled.Text`
  font-family: 'PoppinsBold';
  font-size: ${({ theme }) => theme.fontSize}px;
  color: ${({ theme }) => theme.color.fill};
  text-align: center;
`;

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

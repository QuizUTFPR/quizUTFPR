import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';

export const WrapperButton = styled.TouchableOpacity``;

export const StyledButton = styled(LinearGradient)`
  height: 60px;
  justify-content: center;
`;

export const StyledText = styled.Text`
  font-family: 'RobotoBold';
  font-size: ${({ theme }) => theme.fontSize}px;
  color: white;
  text-align: center;
`;

const WrapperStyledButton = ({
  children,
  onPress,
  mode,
  colors,
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
      <StyledText>{children}</StyledText>
    </StyledButton>
  </WrapperButton>
);

WrapperStyledButton.defaultProps = {
  onPress: () => {},
  activeOpacity: 0.7,
  underlayColor: '#DDDDDD',
  colors: ['#fba92e', '#fba92e'],
};

WrapperStyledButton.propTypes = {
  children: PropTypes.node.isRequired,
  onPress: PropTypes.func,
  activeOpacity: PropTypes.number,
  underlayColor: PropTypes.string,
  colors: PropTypes.arrayOf(PropTypes.string),
};

export default WrapperStyledButton;

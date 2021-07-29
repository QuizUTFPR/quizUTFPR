import PropTypes from 'prop-types';

import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

// STYLES
import theme from '@styles/theme';
import { StyledView, StyledText } from './styles';

const Toast = ({ type, children, open, timeToErase, handleClose }) => {
  const correctIconName = () => {
    if (type === 'error') return 'error';
    if (type === 'success') return 'check-circle';
    return 'lightbulb';
  };

  const correctIconColor = () => {
    if (type === 'error') return theme.color.red;
    if (type === 'success') return theme.color.green;
    return theme.color.blue;
  };

  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (open) {
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 350,
          useNativeDriver: true,
        }),
        Animated.delay(1500),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 350,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [open]);

  useEffect(() => {
    if (open) {
      setTimeout(() => handleClose(), timeToErase);
    }
  }, [open]);

  return (
    <>
      {open && (
        <StyledView
          type={type}
          style={{
            opacity,
            transform: [
              {
                translateY: opacity.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -10],
                }),
              },
            ],
          }}
        >
          <MaterialIcons
            name={correctIconName()}
            size={35}
            color={correctIconColor()}
          />
          <StyledText type={type}>{children}</StyledText>
        </StyledView>
      )}
    </>
  );
};

Toast.defaultProps = {
  type: 'success',
  children: 'Seu Texto aqui!',
  open: true,
  timeToErase: 1000,
};

Toast.propTypes = {
  type: PropTypes.string,
  children: PropTypes.string,
  open: PropTypes.bool,
  timeToErase: PropTypes.number,
  handleClose: PropTypes.func.isRequired,
};

export default Toast;

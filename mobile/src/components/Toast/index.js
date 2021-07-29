import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

// STYLES
import theme from '@styles/theme';
import { StyledView, StyledText } from './styles';

const Toast = ({ type, children }) => {
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

    return () => console.log('desmontou');
  }, []);

  return (
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
  );
};

export default Toast;

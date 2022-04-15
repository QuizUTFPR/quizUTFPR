import React from 'react';
import theme from '@styles/theme';

// STYLES
import {
  StyledView,
  StyledTabButton,
  StyledText,
  BackgroundWrapper,
} from './styles';

const TabBar = ({ state, descriptors, navigation }) => (
  <BackgroundWrapper>
    <StyledView fill="white">
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          // eslint-disable-next-line no-nested-ternary
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <StyledTabButton
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            key={route.key}
          >
            <options.Icon
              name={options.name}
              size={options.size}
              color={isFocused ? theme.color.purple : 'grey'}
            />
            <StyledText isFocused={isFocused}>{label}</StyledText>
          </StyledTabButton>
        );
      })}
    </StyledView>
  </BackgroundWrapper>
);

export default TabBar;

import React from 'react';
import { Text } from 'react-native';

// STYLES
import { StyledView, StyledTabButton } from './styles';

const TabBar = ({ state, descriptors, navigation }) => (
  <StyledView fill="purple">
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
          style={{ flex: 1 }}
          key={route}
        >
          {options.tabBarIcon}
          <Text style={{ color: isFocused ? '#fff' : '#000' }}>{label}</Text>
        </StyledTabButton>
      );
    })}
  </StyledView>
);

export default TabBar;

import React from 'react';
// ICONS
import { Ionicons } from '@expo/vector-icons';

const screenOptions = (route, color) => {
  let iconName;

  switch (route.name) {
    case 'Home':
      iconName = 'md-home';
      break;
    default:
      break;
  }

  return <Ionicons name={iconName} color={color} size={32} />;
};

export default screenOptions;

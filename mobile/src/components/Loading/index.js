import React from 'react';
import { ActivityIndicator } from 'react-native';

import { StyledView } from './style';

const Loading = () => (
  <StyledView>
    <ActivityIndicator size="large" />
  </StyledView>
);

export default Loading;

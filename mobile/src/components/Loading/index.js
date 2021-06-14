import React from 'react';
import { View, ActivityIndicator } from 'react-native';

import styled from 'styled-components/native';

const StyledView = styled(View)`
  flex: 1;
  justify-content: center;
`;

const Loading = () => (
  <StyledView>
    <ActivityIndicator size="large" />
  </StyledView>
);

export default Loading;

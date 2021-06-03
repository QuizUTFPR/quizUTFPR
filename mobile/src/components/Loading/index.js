import React from 'react';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import styled from 'styled-components/native';

const StyledView = styled(View)`
  flex: 1;
  justify-content: center;
`;

const Loading = () => (
  <StyledView>
    <ActivityIndicator size={80} animating />
  </StyledView>
);

export default Loading;

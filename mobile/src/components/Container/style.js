import styled from 'styled-components/native';
import Constants from 'expo-constants';
import { Platform } from 'react-native';

const statusBarHeight =
  Platform.OS === 'android' ? Constants.statusBarHeight : 0;

export const Container = styled.SafeAreaView`
  flex: 1;
  background: white;
`;

export const Wrapper = styled.View`
  flex: 1;
  align-items: center;
  padding-top: ${`${statusBarHeight}px`};
  padding-left: 30px;
  padding-right: 30px;
`;

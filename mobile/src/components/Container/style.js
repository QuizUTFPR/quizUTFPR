import styled from 'styled-components/native';
import Constants from 'expo-constants';
import { Platform } from 'react-native';

const statusBarHeight =
  Platform.OS === 'android' ? Constants.statusBarHeight : 0;

export const Container = styled.SafeAreaView`
  align-items: center;
  flex: 1;
  padding-top: ${`${statusBarHeight}px`};
  padding-left: 30px;
  padding-right: 30px;
`;

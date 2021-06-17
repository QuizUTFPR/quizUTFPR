import styled from 'styled-components/native';
import Constants from 'expo-constants';
import { Platform } from 'react-native';

// DIMENSION TRANSFORMERS
import { widthPercentageToDp } from '@styles/dimensions';

// SVG's AS REACT COMPONENTS
import Bloobs from '@assets/bloobs.svg';

const statusBarHeight =
  Platform.OS === 'android' ? Constants.statusBarHeight : 0;

export const Container = styled.SafeAreaView`
  align-items: center;
  flex: 1;
  padding-top: ${`${statusBarHeight}px`};
  padding-left: 30px;
  padding-right: 30px;
`;

export const BloobsBackground = styled(Bloobs)`
  flex: 1;
  position: absolute;
`;

export const ImageView = styled.View`
  margin-top: 50px;
`;

export const AnimationView = styled.View`
  flex: 0.95;
  width: ${widthPercentageToDp('80%')}px;
  align-self: center;
`;

export const WrapperButton = styled.SafeAreaView`
  margin-top: 15px;
`;

export const StyledTitle = styled.Text`
  margin-top: 20px;
  font-size: ${({ theme }) => theme.fontSize + 12}px;
  font-family: 'PoppinsBlack';
  color: ${({ theme }) => theme.color.fill};
`;

export const StyledParagraph = styled.Text`
  font-family: 'PoppinsRegular';
  font-size: ${({ theme }) => theme.fontSize}px;
  color: ${({ theme }) => theme.color.fill};
`;

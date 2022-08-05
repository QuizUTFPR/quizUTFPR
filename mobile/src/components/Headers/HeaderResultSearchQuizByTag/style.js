import styled from 'styled-components/native';
import { Platform, StatusBar } from 'react-native';

// STYLES
import {
  widthPercentageToDp,
  // heightPercentageToDp
} from '@styles/dimensions';
import HeaderBackground from '@assets/patterns/sunburst.png';

export const HeaderWrapper = styled.SafeAreaView`
  padding: 0 20px;
`;

export const Background = styled.ImageBackground.attrs({
  source: HeaderBackground,
  resizeMode: 'cover',
  borderBottomLeftRadius: 30,
  borderBottomRightRadius: 30,
})`
  padding-top: ${Platform.OS === 'android' ? StatusBar.currentHeight : 0}px;
  padding-bottom: 20px;
  width: ${widthPercentageToDp('100%')}px;
  /* flex: 1; */
  /* height: fit-content; */
`;

export const StyledIconButton = styled.Text``;

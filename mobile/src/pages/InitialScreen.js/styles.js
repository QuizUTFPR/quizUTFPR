import styled from 'styled-components/native';
import Constants from 'expo-constants';
import { Platform } from 'react-native';

// SVG's AS REACT COMPONENTS
import Bloobs from 'assets/bloobs.svg';
import LoginIllustration from 'assets/login_illustration.svg';

const statusBarHeight =
  Platform.OS === 'android' ? Constants.statusBarHeight : 0;

export const Container = styled.SafeAreaView`
  padding-top: ${statusBarHeight + 'px'};
  padding-left: 5px;
  padding-right: 5px;
  flex: 1;
  align-items: center;
`;

export const BloobsBackground = styled(Bloobs)`
  flex: 1;
  position: absolute;
`;

export const ImageView = styled.View``;

export const StyledLoginIllustration = styled(LoginIllustration)``;

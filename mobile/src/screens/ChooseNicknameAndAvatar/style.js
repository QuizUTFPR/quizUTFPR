import styled from 'styled-components/native';
import { Platform, StatusBar } from 'react-native';

// DIMENSION TRANSFORMERS
import { widthPercentageToDp } from '@styles/dimensions';

// Components
import Container from '@components/Container';

export const StyledContainer = styled(Container)`
  padding-top: ${Platform.OS === 'android' ? StatusBar.currentHeight : 0}px;
`;

export const InputWrapper = styled.View`
  width: ${`${widthPercentageToDp('85%')}px`};
`;

export const Title = styled.Text`
  font-size: ${({ theme }) => theme.fontSize.medium}px;
  font-family: 'PoppinsBold';
  width: ${`${widthPercentageToDp('85%')}px`};
  margin-bottom: 5px;
`;

export const Description = styled.Text`
  font-size: ${({ theme }) => theme.fontSize.normal}px;
  font-family: 'PoppinsRegular';
  width: ${`${widthPercentageToDp('85%')}px`};
  margin-bottom: 10px;
`;

export const TopWrapper = styled.View``;

export const MiddleWrapper = styled.View`
  width: ${`${widthPercentageToDp('85%')}px`};
  flex: 1;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`;

export const BottomWrapper = styled.View`
  margin-bottom: 30px;
`;

export const AvatarWrapper = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})`
  margin: 5px;
  height: 85px;
  width: 85px;
  align-items: center;
  justify-content: center;
  border-radius: 2px;
  border: ${({ isActive, theme }) =>
    isActive ? `6px solid ${theme.color.purple}` : '0px'};
`;

export const AvatarImage = styled.Image.attrs({
  borderRadius: 2,
})`
  height: 80px;
  width: 80px;
`;

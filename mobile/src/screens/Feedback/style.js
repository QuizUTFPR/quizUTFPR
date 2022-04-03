import styled from 'styled-components/native';
import { Platform, StatusBar } from 'react-native';

// DIMENSION TRANSFORMERS
import { widthPercentageToDp } from '@styles/dimensions';

// Components
import Container from '@components/Container';
import { StyledButton } from '@components/ButtonGradient/style';

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

export const WrapperHeader = styled.View`
  width: ${`${widthPercentageToDp('85%')}px`};
  margin-bottom: 20px;
`;

export const GoBackButtonWrapper = styled(StyledButton).attrs({
  colors: ['#4B24B1', '#3b1b96'],
})`
  align-items: center;
  width: 40px;
  height: 40px;
`;

export const StyledIconButton = styled.Text``;

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

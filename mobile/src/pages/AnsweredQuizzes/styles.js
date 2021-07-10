import styled from 'styled-components/native';

// ASSETS
import HeaderBackground from '@assets/patterns/sunburst.png';

// DIMENSION TRANSFORMERS
import { widthPercentageToDp, heightPercentageToDp } from '@styles/dimensions';

export const HeaderWrapper = styled.View``;

export const BackgroundHeader = styled.ImageBackground.attrs({
  source: HeaderBackground,
  resizeMode: 'cover',
  imageStyle: {
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
})`
  flex-direction: row;
  justify-content: space-around;
  align-items: flex-end;
  padding-bottom: 20px;
  margin-bottom: 20px;
  width: ${widthPercentageToDp('100%')}px;
  height: ${heightPercentageToDp('15%')}px;
`;

export const HeaderInformations = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

export const HeaderWelcomeTextView = styled.View`
  justify-content: center;
  align-items: center;
`;

export const HeaderButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})``;

export const HeaderTitle = styled.Text`
  color: ${({ theme }) => theme.color.white};
  font-size: ${({ theme }) => theme.fontSize + 3}px;
  font-family: 'PoppinsBold';
`;

export const QuizCard = styled.TouchableOpacity.attrs({ activeOpacity: 0.8 })`
  flex-direction: row;
  align-self: flex-start;
  align-items: center;
  justify-content: space-between;
  width: ${widthPercentageToDp('85%')}px;
  height: ${heightPercentageToDp('12%')}px;
  border-radius: 10px;
  margin-bottom: ${heightPercentageToDp('2%')}px;
  background: ${({ theme }) => theme.color.white};
`;

export const Description = styled.View`
  flex: 1;
  justify-content: space-around;
`;

export const StyledView = styled.View`
  height: 100%;
  flex: 1;
`;

export const StyledImage = styled.Image`
  width: 35%;
  height: 100%;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
`;

export const QuizTitle = styled.Text.attrs({
  ellipsizeMode: 'tail',
  numberOfLines: 1,
})`
  font-size: ${({ theme }) => theme.fontSize - 2}px;
  color: ${({ theme }) => theme.color.fill};
  font-family: 'PoppinsBold';
  margin-left: 10px;
  margin-top: 5px;
`;

export const StyledIconButton = styled.View`
  margin-right: ${({ theme }) => theme.size.padding}px;
`;

export const StyledScrollView = styled.ScrollView.attrs({
  contentContainerStyle: {
    alignItems: 'center',
  },
})`
  width: ${widthPercentageToDp('100%')}px;
`;

export const QuizContainer = styled.View``;
